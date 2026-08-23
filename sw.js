/* O.M.N.I. — service worker: offline cache. Bump CACHE version when pushing updates. */
const CACHE = "omni-v1";
const ASSETS = [
  "./", "./index.html", "./talk.html",
  "./css/core.css", "./css/home.css", "./css/talk.css",
  "./js/omni-data.js", "./js/omni-data2.js", "./js/omni.js", "./js/talk.js",
  "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((r) => r || fetch(e.request).then((res) => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
