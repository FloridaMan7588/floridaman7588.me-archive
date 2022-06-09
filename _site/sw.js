const version = '20220527130520';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return ["/personal/news/website/2022/05/26/guess-whos-back/","/personal/2021/11/28/backlogged/","/docker/home%20assistant/tutorial/2021/10/03/home-assistant-supervised/","/news/personal/2021/10/02/hello-again/","/news/website/2021/09/07/progress/","/news/website/2021/07/22/website-updates/","/news/website/2021/06/28/new-website/","/404","/about/","/altjb/","/beta/","/categories/","/contact/","/cydia/","/blog/","/","/privacy-policy/","/projects/","/manifest.json","/assets/search.json","/assets/styles.css","/redirects.json","/feed.xml","/sitemap.xml","/robots.txt","/blog/page2/","/assets/logos/logo.svg", "/assets/default-offline-image.png", "/assets/scripts/fetch.js"
  ]
}

const updateStaticCache = () => {
  return caches.open(cacheName).then(cache => {
    return cache.addAll(buildContentBlob());
  });
};

const clearOldCache = () => {
  return caches.keys().then(keys => {
    // Remove caches whose name is no longer valid.
    return Promise.all(
      keys
        .filter(key => {
          return key !== cacheName;
        })
        .map(key => {
          console.log(`Service Worker: removing cache ${key}`);
          return caches.delete(key);
        })
    );
  });
};

self.addEventListener("install", event => {
  event.waitUntil(
    updateStaticCache().then(() => {
      console.log(`Service Worker: cache updated to version: ${cacheName}`);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clearOldCache());
});

self.addEventListener("fetch", event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests from the same domain.
  if (url.origin !== location.origin) {
    return;
  }

  // Always fetch non-GET requests from the network.
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Default url returned if page isn't cached
  let offlineAsset = "/offline/";

  if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
    // If url requested is an image and isn't cached, return default offline image
    offlineAsset = "/assets/default-offline-image.png";
  }

  // For all urls request image from network, then fallback to cache, then fallback to offline page
  event.respondWith(
    fetch(request).catch(async () => {
      return (await caches.match(request)) || caches.match(offlineAsset);
    })
  );
  return;
});
