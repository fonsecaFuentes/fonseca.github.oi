const STATIC_CACHE = "static";

const APP_SHELL = [
    "/",
    "index.html",
    "css/styles.css",
    "index.js",
    "json/data_user.json",
    "img/icono.png",
];

self.addEventListener("install", (e) => {
    const cache_static = caches
        .open(STATIC_CACHE)
        .then((cache) => cache.addAll(APP_SHELL));

    e.waitUntil(cache_static);
});


self.addEventListener("fetch", (e) =>{
    console.log("fetch", e.request);

    e.respondWith(
        caches
            .match(e.request)
            .then((res) => res || fetch(e.request))
            .catch(console.log));
});