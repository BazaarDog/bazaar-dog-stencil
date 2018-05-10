declare var Context: any;

Context.IPFS_gateway = 'https://gateway.ob1.io/';
Context.IPNS_gateway = 'https://alpha.bazaar.dog/';
Context.gateway = '/';

if ('serviceWorker' in navigator) {
    console.log("There was service worker support");
    Context.gateway = '/';
} else {
    Context.gateway = Context.IPFS_gateway;
}