/* BaoForm service worker：离线缓存应用壳与数据 */
const CACHE_NAME = 'baoform-v1';

const APP_SHELL = [
  './calculator.html',
  './css/style.css',
  './js/app.js',
  './js/data/hema.js',
  './js/data/kuailehou.js',
  './favicon.svg',
  './favicon.svg?v=2',
  './favicon.ico',
  './favicon.ico?v=2',
  './apple-touch-icon.png',
  './apple-touch-icon.png?v=2',
  './icon-192.png',
  './icon-512.png',
  './site.webmanifest',
  './site.webmanifest?v=2',
];

const SHELL_URLS = APP_SHELL.map(p => new URL(p, self.location.href).href);
const OFFLINE_URL = new URL('./calculator.html', self.location.href).href;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('baoform-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 外部资源（Google Fonts 等）：先读缓存，后台更新；断网时用旧缓存。
  if (url.origin !== self.location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        const network = fetch(req).then(res => {
          if (res && (res.ok || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // 页面导航：网络优先，断网时回退到缓存的 calculator.html。
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }).catch(() =>
        caches.match(req).then(cached => cached || caches.match(OFFLINE_URL))
      )
    );
    return;
  }

  // 本地静态资源：缓存优先，未命中再走网络并写入缓存。
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      }
      return res;
    }))
  );
});
