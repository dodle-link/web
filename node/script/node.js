import * as Y from "https://esm.sh/yjs@13";
import { IndexeddbPersistence } from "https://esm.sh/y-indexeddb@9?deps=yjs@13";
import { WebrtcProvider } from "https://esm.sh/y-webrtc@10?deps=yjs@13";

const $ = (id) => document.getElementById(id);
const name = decodeURIComponent(location.hash.slice(1)) || "default";
$("room").value = name;
$("join").onclick = () => {
  location.hash = encodeURIComponent($("room").value.trim() || "default");
  location.reload();
};

const roomId = "dodle-node-" + name;
const doc = new Y.Doc();
const idb = new IndexeddbPersistence(roomId, doc);
// Default public signaling servers are unreliable; replace for anything beyond a prototype.
const rtc = new WebrtcProvider(roomId, doc);
const items = doc.getMap("items");

const render = () => {
  const list = $("list");
  list.replaceChildren();
  for (const [k, v] of Object.entries(items.toJSON())) {
    const li = document.createElement("li");
    li.textContent = `${k} = ${v}`;
    const del = document.createElement("button");
    del.textContent = "x";
    del.onclick = () => items.delete(k);
    li.append(del);
    list.append(li);
  }
};

let synced = false;
const status = () => {
  $("status").textContent =
    `room: ${name} | local db: ${synced ? "loaded" : "loading"} | peers: ${rtc.room?.webrtcConns.size ?? 0}`;
};

idb.whenSynced.then(() => { synced = true; render(); status(); });
items.observe(render);
rtc.on("peers", status);
status();

$("form").onsubmit = (e) => {
  e.preventDefault();
  items.set($("key").value.trim(), $("val").value);
  e.target.reset();
};
