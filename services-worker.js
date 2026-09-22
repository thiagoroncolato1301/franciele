/* =========================================
   USF MOBILE - SERVICE WORKER
========================================= */

const CACHE_NAME = "usf-mobile-v1";


const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./app.js",

    "./manifest.json",

    "./icons/icon-192.png",

    "./icons/icon-512.png"

];


/* =========================================
   INSTALL
========================================= */

self.addEventListener(
    "install",
    event => {

        console.log(
            "USF Mobile Service Worker: install"
        );


        event.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(
                cache => {

                    return cache.addAll(
                        FILES_TO_CACHE
                    );

                }
            )

        );


        self.skipWaiting();

    }
);


/* =========================================
   ACTIVATE
========================================= */

self.addEventListener(
    "activate",
    event => {

        console.log(
            "USF Mobile Service Worker: activate"
        );


        event.waitUntil(

            caches.keys()
                .then(
                    cacheNames => {

                        return Promise.all(

                            cacheNames
                                .filter(
                                    cacheName =>
                                        cacheName !==
                                        CACHE_NAME
                                )
                                .map(
                                    cacheName =>
                                        caches.delete(
                                            cacheName
                                        )
                                )

                        );

                    }
                )

        );


        self.clients.claim();

    }
);


/* =========================================
   FETCH
========================================= */

self.addEventListener(
    "fetch",
    event => {

        if (
            event.request.method !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            caches.match(
                event.request
            )
            .then(
                cachedResponse => {

                    if (cachedResponse) {

                        return cachedResponse;

                    }


                    return fetch(
                        event.request
                    )
                    .then(
                        networkResponse => {

                            if (
                                !networkResponse ||
                                networkResponse.status !== 200 ||
                                networkResponse.type === "opaque"
                            ) {

                                return networkResponse;

                            }


                            const responseClone =
                                networkResponse.clone();


                            caches.open(
                                CACHE_NAME
                            )
                            .then(
                                cache => {

                                    cache.put(
                                        event.request,
                                        responseClone
                                    );

                                }
                            );


                            return networkResponse;

                        }
                    )
                    .catch(
                        () => {

                            return caches.match(
                                "./index.html"
                            );

                        }
                    );

                }
            )

        );

    }
);