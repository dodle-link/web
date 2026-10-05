# Dodle Node

Dodle Node is a small shared key-value page backed by a Yjs document. It stores each browser's document in IndexedDB and can synchronize same-origin browser tabs locally. An optional WebSocket signaling relay lets peers on different devices discover each other and establish WebRTC connections.

## Run Without a Signaling Server

Serve the `web` directory with any static HTTP server. For example, from the `web` directory:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/node/>. Signaling is off by default, so no Python packages or signaling process are needed. IndexedDB persistence works locally, and tabs on the same browser origin can synchronize through BroadcastChannel.

## Run With Signaling and a Quick Tunnel

The included server serves the page and its assets, runs the signaling relay, and starts a Cloudflare Quick Tunnel. It requires Python 3.10 or newer and `cloudflared` available on `PATH`.

Create and activate a virtual environment, then install the server dependency:

```sh
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r node/requirements.txt
```

Start the server from the `web` directory:

```sh
python3 node/server.py
```

The terminal prints a local URL and, after Cloudflare creates the tunnel, a public URL. Open the printed `/node/?signal=on` URL to enable signaling. Keep the process running while peers use the tunnel; press Ctrl+C to stop it. The Quick Tunnel URL is temporary and changes when the tunnel is restarted.

To run the relay locally without launching Cloudflare Tunnel:

```sh
python3 node/server.py --no-tunnel
```

The server accepts `--host` and `--port` options. The default port is `8000`; the `PORT` environment variable can also set it.

## Rooms and Data

The room name is taken from the URL fragment, such as `#team-notes`. The default room is `default`. Joining a room changes the fragment in the URL, so share the same room name with peers.

The signaling server only keeps active room subscriptions in memory and forwards signaling messages. It does not store Yjs documents. Document persistence is browser-local through IndexedDB, so it is not a shared server-side backup. The relay and Quick Tunnel have no authentication; anyone who can reach the public URL may attempt to join a room. Do not use this setup for sensitive data or as a production-hosted service.
