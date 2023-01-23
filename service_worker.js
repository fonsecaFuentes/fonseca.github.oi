//Cache
const STATIC_CACHE = "static";

//Archivos a guardar
const APP_SHELL = [
    "/",
    "index.html",
    "css/styles.css",
    "index.js",
    "json/data_user.json",
    "img/icono.png",
];

//Guardamos en caché
self.addEventListener("install", (e) => {
    const cache_static = caches
        .open(STATIC_CACHE)
        .then((cache) => cache.addAll(APP_SHELL));

    e.waitUntil(cache_static);
});

//Comprobar si la peticiones están dentro del caché, y válida de donde toma esos datos
self.addEventListener("fetch", (e) =>{
    console.log("fetch", e.request);

    e.respondWith(
        caches
            .match(e.request)
            .then((res) => res || fetch(e.request))
            .catch(console.log));
});