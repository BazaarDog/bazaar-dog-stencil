importScripts('workbox-v3.1.0/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

importScripts('./assets/ipfs.config.js');
importScripts('./assets/ipfs.min.js');
importScripts('./assets/ipfs-postmsg-proxy.2.16.1.js');



async function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

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


self.addEventListener('activate', (event) => {
    console.log('activate step');
    ipfsconfig.repo =   "BazaarDog-ipfs";
    self.node = new Ipfs(ipfsconfig);
    self.node.on('ready', () => console.log('node is ready...\n\n\n _               _        \n|_) _._  _. _.._| \\ _  _  \n|_)(_|/_(_|(_|| |_/(_)(_| \n                       _| \nusing awesome js-ipfs\n'));
    self.node.on('error', (err) => console.log('js-ipfs node errored\n\n\n####### ######  ######  ####### ######\n#       #     # #     # #     # #     #\n#       #     # #     # #     # #     #\n#####   ######  ######  #     # ######\n#       #   #   #   #   #     # #   #\n#       #    #  #    #  #     # #    #\n####### #     # #     # ####### #     #\n', err));
    event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith(self.location.origin + '/ipfs')) {
        return console.log('Fetch not in scope', event.request.url);
    }



    const multihash = event.request.url.split('/ipfs/')[1];
    if(self.node!==undefined) {
        //console.log('Handling fetch event for', event.request.url);
        event.respondWith(catAndRespond(multihash));
    }else {
        console.log('FALLBACK!!');
        fetch("https://gateway.ob1.io/ipfs/"+ multihash).then(function(response) {
console.log(response.content);
            return response;
            //const headers = { status: 200, statusText: 'OK', headers: {} };
            //return new Response(response, headers);
        });
    }
});

async function catAndRespond (hash) {
    const data = await self.node.dag.get(hash);
    const headers = { status: 200, statusText: 'OK', headers: {} };
    return new Response(data.value, headers)
}

IpfsPostmsgProxy.createProxyServer(() => self.node, {
    addListener: self.addEventListener.bind(self),
    removeListener: self.removeEventListener.bind(self),
    async postMessage (data) {
    // TODO: post back to the client that sent the message?
    const clients = await self.clients.matchAll();
    clients.forEach(client => client.postMessage(data));
}
});

self.workbox.precaching.precacheAndRoute([]);
