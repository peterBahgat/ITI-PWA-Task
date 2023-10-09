const cacheName = "cacheNumOne";
const assets = [
    '/index.html',
    '/about.html',
    '/node_modules/bootstrap/dist/css/bootstrap.min.css',
    '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    '/app.js'
];

//? self === this
self.addEventListener("install",(installEvent)=>{
    installEvent.waitUntil(
        caches.open(cacheName).then((cache)=>{
            cache.addAll(assets).then().catch()
        }).catch(err=>console.log(err))
    )
})


this.addEventListener("activate",(activatedEvent)=>{
activatedEvent.waitUntil(
    caches.keys().then((keys)=>{
        return Promise.all(
            keys.filter(key=> key != cacheName).map(key=>caches.delete(key))
        )
    }).catch(err=>console.log(err))
)
})

self.addEventListener("fetch",(fetchedEvent)=>{

    fetchedEvent.respondWith(
        caches.match(fetchedEvent.request).then((res)=>{
            return res || fetch(fetchedEvent.request).then((fetchers)=>{
                caches.open(cacheName).then(cache=>{
                    cache.put(fetchedEvent.request.fetchers.clone())
                    return fetchers;
                })
            })
        })
    )

})