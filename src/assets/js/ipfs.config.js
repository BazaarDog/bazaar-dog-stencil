ipfsconfig = {
  "EXPERIMENTAL": {
    "dht": true,
    //pubsub: true, // enable pubsub
    "relay": {
      "enabled": true,
      // enable relay dialer/listener (STOP)
      "hop": {
        "enabled": true
        // make this node a relay (HOP)
      }
    }
  },
  "config": {
    "Addresses": {
      "Swarm": [
        "/dns4/ws-star.bazaar.green/tcp/443/wss/p2p-websocket-star"
        // this is either or
        //"/dns4/star-signal.bazaar.green/tcp/443/wss/p2p-websocket-star"
        //"/dns4/star-signal.bazaar.green/tcp/443/wss/p2p-webrtc-star"
      ]
    },
    "Bootstrap": [
      "/dns4/go1-bootstrap.bazaar.green/tcp/443/wss/ipfs/QmTBVgfJ4jZdyUhdHYi73oBjupSHv7bRNjMcVYupC13sJh",
      "/dns4/go2-bootstrap.bazaar.green/tcp/443/wss/ipfs/QmSvtTi5MCnSGYRudS9wpMB8WJf1DfQL7E8igVg2FsvaeF",
      //"/dns4/js1-bootstrap.bazaar.green/tcp/443/wss/ipfs/QmcR2YaeDonVRGY9NC1RxxNpRfH3ivg1nnLGgMZMX8Fp8Q",
      "/p2p-circuit/dns4/js1-bootstrap.bazaar.green/tcp/443/wss/ipfs/QmcR2YaeDonVRGY9NC1RxxNpRfH3ivg1nnLGgMZMX8Fp8Q"
    ]
  }
};