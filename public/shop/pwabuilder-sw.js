//This is the "Offline page" service worker

//Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function (event) {
  var offlinePage = new Request('offline.html');
  event.waitUntil(
    fetch(offlinePage).then(function (response) {
      return caches.open('pwabuilder-offline').then(function (cache) {
        console.log('[PWA Builder] Cached offline page during Install' + response.url);
        return cache.put(offlinePage, response);
      });
    }));
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function (error) {
      console.error('[PWA Builder] Network request Failed. Serving offline page ' + error);
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match('offline.html');
      });
    }
    ));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function (response) {
  return caches.open('pwabuilder-offline').then(function (cache) {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: ' + response.url);
    return cache.put(offlinePage, response);
  });
});

importScripts('/cache-polyfill.js');

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('airhorner').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/style',
        '/data-pembayaran.html',
        '/data-pembelian.html',
        '/detail-ikan.html',
        '/fish-today-berita.html',
        '/fish-today-list.html',
        '/keranjang.html',
        '/list-ikan.html',
        '/login.html',
        '/struk.html',
        '/transaksi.html',
        '/bca.jpg',
        '/berita-setahun-pemerintah.jpg',
        '/berita-tak-hanya.jpg',
        '/bri.jpg',
        '/Ikan-Tongkol.jpg',
        '/Ikan-Tongkol-v2.jpg',
        '/Ikan-Tongkol-v3.jpg',
        '/Ikan-Tongkol-v4.jpg',
        '/mandiri.jpg',
        '/mandiri_syariah.jpg',
        '/Ikan-Tongkol.jpg',
        '/icon-mariteam.png',
        '/001-shopping-basket.png',
        '/002-secure.png',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/styles/main.css',
        '/scripts/main.min.js',
        '/sounds/airhorn.mp3'
      ]);
    })
  );
});
