import Storage from './storage';
import {Profile} from '../global/interfaces';
///SearchOptionInterface,

export default class PeerService {

    public storage: Storage = new Storage();

    constructor() {
    }


    addPeer(peer: Profile): void {
        this.storage.get('searchProviders').then((peers) => {
            if (peers !== null) {
                peers.push(peer);
            } else {
                peers = [peer];
            }
            this.storage.set('searchProviders', peers);
        });
    }

    removePeer(peer): void {
        this.storage.get('searchProviders').then((peers) => {
            peers.splice(peers.indexOf(peer), 1);
            this.storage.set('searchProviders', peers);
        });
    }


    cacheSearchResults(peer: Profile, response): void {
        this.storage.set('cachedResults-' + peer.peerID, response);
    }

    getPeers(): Promise<any> {
        console.log("Getting Search Providers Call");

        return this.storage.get('searchProviders').then((peers) => {
                if (peers === null) {
                    console.log("No Saved Providers");
                    fetch('/assets/data.json').then((response) => {
                            response.json().then((data) => {
                                console.log(data.searchProviders);
                                this.setPeers(data.searchProviders);
                                return data.searchProviders;
                            });
                        }
                    );
                }
                else {
                    console.log("There were saved peers");
                    return peers;
                }
            }
        );
    }

    getSavedProvider(): Promise<any> {
        console.log("Getting Saved Provider");
        return this.storage.get('lastPeer').then((peer) => {
                //console.log(peer);
                if (peer === null || (Object.keys(peer).length === 0)) {
                    console.log("No Previous Serarch Provider");
                    fetch('/assets/data.json').then((response) => {
                            response.json().then((data) => {
                                let bd = data.searchProviders.filter(function (obj) {
                                    return obj.id == 'bazaardog';
                                })[0];
                                this.setSavedProvider(bd);
                                return bd;
                            });
                        }
                    );
                } else {
                    console.log("Stored Serarch Provider");
                    console.log(JSON.stringify(peer));
                    return peer;
                }
            }
        );
    }

    setSavedProvider(peer: Profile): void {
        this.storage.set('lastPeer', peer);
    }

    setPeers(peers: Array<Profile>): void {
        this.storage.set('searchProviders', peers);
    }

}