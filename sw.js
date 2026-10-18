// cache-first, populated on first load (incl. ?eye= variants share the same assets)
const C='grok-eyes-v2'
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./eyes.html','./manifest.webmanifest'])).catch(()=>{}))})
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()))
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(e.request,{ignoreSearch:true});if(hit){fetch(e.request).then(r=>r.ok&&c.put(e.request,r.clone())).catch(()=>{});return hit}const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}))})
