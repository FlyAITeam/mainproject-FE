if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const f=e=>n(e,c),r={module:{uri:c},exports:t,require:f};s[c]=Promise.all(a.map((e=>r[e]||f(e)))).then((e=>(i(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/13b76428-7f9834f11c793e4f.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/190-d3b70f3f8db581ec.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/385cb88d-a2b01dfc4ff31f6f.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/5e22fd23-b25ed457d0748b5c.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/701-19254f42159889e0.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/742-c7b055eaf9a517ec.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/787-13bca1f7bf89b912.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/9c4e2130-ef0e0629c18feede.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/_not-found/page-465b39e22f843b80.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/dogs/page-7d5f3deb6b79e959.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/layout-e4d4a1dacc4d716d.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/login/page-60d938e896c76a54.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/main/page-a45a148463ae43e7.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/map/page-81094ad7f8c04041.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/mypage/page-0e20d972a1940fcf.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/page-b8740b15683c8a1e.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/register/page-7516b7bb9b1255f9.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/app/showroom/page-2a3c788a10e9e8d5.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/ca377847-1bc116892331575f.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/f97e080b-61c89ff590887528.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/fd9d1056-2803f9369ec96b4e.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/main-20c4175436429ddd.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/main-app-300045f0cf9dd724.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-d7cc5caa9533d2ea.js",revision:"qCCO58V5eKDZf8U6CHzff"},{url:"/_next/static/css/1bee4a64ea3236cd.css",revision:"1bee4a64ea3236cd"},{url:"/_next/static/css/4c725164773d5f91.css",revision:"4c725164773d5f91"},{url:"/_next/static/css/5ef1019dd2f2a6a4.css",revision:"5ef1019dd2f2a6a4"},{url:"/_next/static/media/ff840cfebfb63b0c-s.p.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/_next/static/qCCO58V5eKDZf8U6CHzff/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/qCCO58V5eKDZf8U6CHzff/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/fonts/PretendardVariable.woff2",revision:"302ec55f5b4320354ec6b35a53dead87"},{url:"/icons/android-icon-192x192.png",revision:"8ba9d949f8a7cedb5ddffc7167d42d46"},{url:"/icons/android-icon-512x512.png",revision:"22dbd01479c991efb189fefc8f3c4a03"},{url:"/icons/apple-touch-icon.png",revision:"417b68ce1a71df063c5d2cad6c403e74"},{url:"/icons/favicon-16x16.png",revision:"1eeda7b676d11a3e14632e2f4efb1cd9"},{url:"/icons/favicon-32x32.png",revision:"3ac72bf01eb8b1a00a9e48e0524b6009"},{url:"/icons/favicon.ico",revision:"822960843464355b12b53d7eb9ae87dc"},{url:"/icons/icon.png",revision:"c3c41cfb83a8cf61941167d34717054d"},{url:"/icons/safari-pinned-tab.svg",revision:"9ebd7f7aa08b554497e7e0061ba41a79"},{url:"/icons/share.png",revision:"c3c41cfb83a8cf61941167d34717054d"},{url:"/imgs/banner.png",revision:"5376d2a6d7f30143de3b768a82f9a187"},{url:"/robots.txt",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/svgs/icons/breatheHead.svg",revision:"40ae631fc1e26e88bbe2922a14f894d8"},{url:"/svgs/icons/breatheTongue.svg",revision:"df43236b241f9825fdcc8e4f11c9b075"},{url:"/svgs/icons/heart.svg",revision:"ad2683ff8c7d8641dbdfc66c8dc6094f"},{url:"/svgs/icons/sleepdog.svg",revision:"5c5b5e7b883c119b1c8b2473d727ae7b"},{url:"/svgs/icons/standdog.svg",revision:"54571bddac3d28e898dea0d374463ecc"},{url:"/svgs/logo.svg",revision:"9ebd7f7aa08b554497e7e0061ba41a79"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
