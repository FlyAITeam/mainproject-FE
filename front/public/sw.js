if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + ".js", n).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, a) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let t = {};
    const o = (e) => i(e, c),
      r = { module: { uri: c }, exports: t, require: o };
    s[c] = Promise.all(n.map((e) => r[e] || o(e))).then((e) => (a(...e), t));
  };
}
define(["./workbox-f1770938"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/190-d3b70f3f8db581ec.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/309-ce8671a0a65df721.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/385cb88d-a2b01dfc4ff31f6f.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/580-401dfaae654b1e21.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/5e22fd23-b25ed457d0748b5c.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/742-c7b055eaf9a517ec.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/787-fc88203d00dd96e9.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/795d4814-b04ea92a99824360.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/9c4e2130-ef0e0629c18feede.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-465b39e22f843b80.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/dogs/page-758f635b4529f716.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/layout-b48f188315bc596c.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/login/page-ea9ed477d52c3ffa.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/main/page-efc4076b11e4946c.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/map/page-47f2092a59d565f7.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/mypage/page-bae1554ca70df776.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/page-094da68402891557.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/register/page-de7d48a8a97c7d52.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/app/showroom/page-7ea20a7195c06043.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/ca377847-af36993cbdebf57d.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/fd9d1056-2803f9369ec96b4e.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/framework-f66176bb897dc684.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/main-20c4175436429ddd.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/main-app-300045f0cf9dd724.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/pages/_app-6a626577ffa902a4.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/pages/_error-1be831200e60c5c0.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-9d9ae1bb5a7446dc.js",
          revision: "oZ_y7YyIEhp1_7Vi0H3QF",
        },
        {
          url: "/_next/static/css/4c725164773d5f91.css",
          revision: "4c725164773d5f91",
        },
        {
          url: "/_next/static/css/5ef1019dd2f2a6a4.css",
          revision: "5ef1019dd2f2a6a4",
        },
        {
          url: "/_next/static/css/83476d17d71564bc.css",
          revision: "83476d17d71564bc",
        },
        {
          url: "/_next/static/media/ff840cfebfb63b0c-s.p.woff2",
          revision: "302ec55f5b4320354ec6b35a53dead87",
        },
        {
          url: "/_next/static/oZ_y7YyIEhp1_7Vi0H3QF/_buildManifest.js",
          revision: "2ec694eb52ae4f523f265a46bae4d768",
        },
        {
          url: "/_next/static/oZ_y7YyIEhp1_7Vi0H3QF/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/fonts/PretendardVariable.woff2",
          revision: "302ec55f5b4320354ec6b35a53dead87",
        },
        {
          url: "/icons/android-icon-192x192.png",
          revision: "8ba9d949f8a7cedb5ddffc7167d42d46",
        },
        {
          url: "/icons/android-icon-512x512.png",
          revision: "22dbd01479c991efb189fefc8f3c4a03",
        },
        {
          url: "/icons/apple-touch-icon.png",
          revision: "417b68ce1a71df063c5d2cad6c403e74",
        },
        {
          url: "/icons/favicon-16x16.png",
          revision: "1eeda7b676d11a3e14632e2f4efb1cd9",
        },
        {
          url: "/icons/favicon-32x32.png",
          revision: "3ac72bf01eb8b1a00a9e48e0524b6009",
        },
        {
          url: "/icons/favicon.ico",
          revision: "822960843464355b12b53d7eb9ae87dc",
        },
        {
          url: "/icons/icon.png",
          revision: "c3c41cfb83a8cf61941167d34717054d",
        },
        {
          url: "/icons/safari-pinned-tab.svg",
          revision: "9ebd7f7aa08b554497e7e0061ba41a79",
        },
        {
          url: "/icons/share.png",
          revision: "c3c41cfb83a8cf61941167d34717054d",
        },
        {
          url: "/imgs/banner.png",
          revision: "5376d2a6d7f30143de3b768a82f9a187",
        },
        { url: "/robots.txt", revision: "d41d8cd98f00b204e9800998ecf8427e" },
        {
          url: "/svgs/icons/breatheHead.svg",
          revision: "40ae631fc1e26e88bbe2922a14f894d8",
        },
        {
          url: "/svgs/icons/breatheTongue.svg",
          revision: "df43236b241f9825fdcc8e4f11c9b075",
        },
        {
          url: "/svgs/icons/heart.svg",
          revision: "ad2683ff8c7d8641dbdfc66c8dc6094f",
        },
        {
          url: "/svgs/icons/sleepdog.svg",
          revision: "5c5b5e7b883c119b1c8b2473d727ae7b",
        },
        {
          url: "/svgs/icons/standdog.svg",
          revision: "54571bddac3d28e898dea0d374463ecc",
        },
        { url: "/svgs/logo.svg", revision: "9ebd7f7aa08b554497e7e0061ba41a79" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith("/api/auth/callback") || !s.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: i }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        i &&
        !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: i }) =>
        "1" === e.headers.get("RSC") && i && !s.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
