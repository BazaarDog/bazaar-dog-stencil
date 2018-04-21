importScripts('workbox-v3.0.0-alpha.6/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

//const IPFS = require('ipfs');
//const { createProxyServer } = require('ipfs-postmsg-proxy');

//let node;

/*
  Routes
*/
workbox.routing.registerRoute(
    new RegExp('/\.(?:json)$/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'ipnsJson',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 7 * 24 * 60 * 60 // seven days
            }),
        ],
    }),
);


/*
  This is our code to handle push events.
*/
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Notification';
  const options = {
    body: `${event.data.text()}`,
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/*
self.addEventListener('activate', (event) => {
    console.log('activate step');

    const node = new IPFS({
        config: {
            Addresses: {
                Swarm: []
            }
        }
    });
    node.on('ready', () => console.log('js-ipfs node is ready'));
    node.on('error', (err) => console.log('js-ipfs node errored', err));

    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith(self.location.origin + '/ipfs')) {
        return console.log('Fetch not in scope', event.request.url);
    }

    console.log('Handling fetch event for', event.request.url);

    const multihash = event.request.url.split('/ipfs/')[1];
    event.respondWith(catAndRespond(multihash));
});

async function catAndRespond (hash) {
    const data = await node.files.cat(hash);
    const headers = { status: 200, statusText: 'OK', headers: {} };
    return new Response(data, headers)
}

createProxyServer(() => node, {
    addListener: self.addEventListener.bind(self),
    removeListener: self.removeEventListener.bind(self),
    async postMessage (data) {
    // TODO: post back to the client that sent the message?
    const clients = await self.clients.matchAll();
    clients.forEach(client => client.postMessage(data));
}
});
*/
self.workbox.precaching.precacheAndRoute([]);
