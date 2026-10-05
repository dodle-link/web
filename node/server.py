"""Serve the Dodle Node page and a y-webrtc signaling relay."""

import argparse
import asyncio
import json
import os
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import quote, urlsplit

from aiohttp import ClientError, ClientSession, ClientTimeout, WSMsgType, web


WEB_ROOT = Path(__file__).resolve().parent.parent
topics = {}


async def signaling(request):
    websocket = web.WebSocketResponse(heartbeat=25, max_msg_size=1024 * 1024)
    await websocket.prepare(request)
    subscribed_topics = set()

    try:
        async for message in websocket:
            if message.type == WSMsgType.TEXT:
                try:
                    data = json.loads(message.data)
                except json.JSONDecodeError:
                    continue
                if not isinstance(data, dict):
                    continue

                kind = data.get("type")
                names = data.get("topics", [])
                if kind == "subscribe" and isinstance(names, list):
                    for name in names:
                        if isinstance(name, str):
                            topics.setdefault(name, set()).add(websocket)
                            subscribed_topics.add(name)
                elif kind == "unsubscribe" and isinstance(names, list):
                    for name in names:
                        if isinstance(name, str):
                            subscribers = topics.get(name)
                            if subscribers is not None:
                                subscribers.discard(websocket)
                                if not subscribers:
                                    topics.pop(name, None)
                            subscribed_topics.discard(name)
                elif kind == "publish" and isinstance(data.get("topic"), str):
                    subscribers = topics.get(data["topic"], set())
                    data["clients"] = len(subscribers)
                    payload = json.dumps(data)
                    await asyncio.gather(
                        *(client.send_str(payload) for client in tuple(subscribers) if not client.closed),
                        return_exceptions=True,
                    )
                elif kind == "ping":
                    await websocket.send_json({"type": "pong"})
            elif message.type in (WSMsgType.ERROR, WSMsgType.CLOSE, WSMsgType.CLOSED):
                break
    finally:
        for name in subscribed_topics:
            subscribers = topics.get(name)
            if subscribers is not None:
                subscribers.discard(websocket)
                if not subscribers:
                    topics.pop(name, None)

    return websocket


async def turn_credentials(request):
    origin = request.headers.get("Origin")
    if origin and urlsplit(origin).netloc != request.host:
        raise web.HTTPForbidden(text="Cross-origin request denied")

    key_id = os.environ.get("CLOUDFLARE_TURN_KEY_ID")
    api_token = os.environ.get("CLOUDFLARE_TURN_API_TOKEN")
    if not key_id or not api_token:
        raise web.HTTPServiceUnavailable(text="Cloudflare TURN is not configured")

    endpoint = (
        "https://rtc.live.cloudflare.com/v1/turn/keys/"
        f"{quote(key_id, safe='')}/credentials/generate-ice-servers"
    )
    try:
        async with ClientSession(timeout=ClientTimeout(total=10)) as session:
            async with session.post(
                endpoint,
                headers={"Authorization": f"Bearer {api_token}"},
                json={"ttl": 3600},
            ) as response:
                if response.status != 201:
                    raise web.HTTPBadGateway(text="Cloudflare TURN credential request failed")
                credentials = await response.json()
    except (ClientError, asyncio.TimeoutError, ValueError) as error:
        raise web.HTTPBadGateway(text="Could not retrieve Cloudflare TURN credentials") from error

    if not isinstance(credentials, dict) or not isinstance(credentials.get("iceServers"), list):
        raise web.HTTPBadGateway(text="Cloudflare returned invalid TURN credentials")

    return web.json_response(credentials, headers={"Cache-Control": "no-store"})


async def root(_request):
    raise web.HTTPFound("/node/")


async def node_page(_request):
    return web.FileResponse(WEB_ROOT / "node" / "index.html")


def create_app():
    app = web.Application()
    app.router.add_get("/", root)
    app.router.add_get("/node", lambda _request: web.HTTPFound("/node/"))
    app.router.add_get("/node/", node_page)
    app.router.add_get("/signal", signaling)
    app.router.add_post("/turn-credentials", turn_credentials)
    app.router.add_static("/css/", WEB_ROOT / "css", show_index=False)
    app.router.add_static("/script/", WEB_ROOT / "script", show_index=False)
    return app


async def run_tunnel(port):
    executable = shutil.which("cloudflared")
    if executable is None:
        raise RuntimeError("cloudflared was not found; install it or run with --no-tunnel")

    process = await asyncio.create_subprocess_exec(
        executable,
        "tunnel",
        "--url",
        f"http://127.0.0.1:{port}",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT,
    )
    url_pattern = re.compile(r"https://[a-z0-9-]+\.trycloudflare\.com", re.IGNORECASE)

    async def relay_output():
        if process.stdout is None:
            return
        while line := await process.stdout.readline():
            text = line.decode(errors="replace").rstrip()
            print(f"[cloudflared] {text}", flush=True)
            match = url_pattern.search(text)
            if match:
                print(f"Node page: {match.group(0)}/node/?signal=on", flush=True)

    output_task = asyncio.create_task(relay_output())
    try:
        return_code = await process.wait()
        if return_code:
            raise RuntimeError(f"cloudflared exited with status {return_code}")
    finally:
        if process.returncode is None:
            process.terminate()
            await process.wait()
        await output_task


async def serve(args):
    runner = web.AppRunner(create_app())
    await runner.setup()
    site = web.TCPSite(runner, args.host, args.port)
    await site.start()
    print(f"Node page: http://{args.host}:{args.port}/node/?signal=on", flush=True)
    print(f"Signaling: ws://{args.host}:{args.port}/signal", flush=True)

    try:
        if args.no_tunnel:
            await asyncio.Event().wait()
        else:
            await run_tunnel(args.port)
    finally:
        await runner.cleanup()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8000")))
    parser.add_argument("--no-tunnel", action="store_true", help="serve locally without cloudflared")
    args = parser.parse_args()

    try:
        asyncio.run(serve(args))
    except KeyboardInterrupt:
        pass
    except RuntimeError as error:
        print(error, file=sys.stderr)
        raise SystemExit(1) from error


if __name__ == "__main__":
    main()