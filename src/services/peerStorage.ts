import Storage from './storage';
import {SearchProvider} from '../global/interfaces';
///SearchOptionInterface,

export default class SearchProviderService {

    public storage: Storage = new Storage();

    constructor() {
    }


    addSearchProvider(provider: SearchProvider): void {
        this.storage.get('searchProviders').then((providers) => {
            if (providers !== null) {
                providers.push(provider);
            } else {
                providers = [provider];
            }
            this.storage.set('searchProviders', providers);
        });
    }

    removeSearchProvider(provider): void {
        this.storage.get('searchProviders').then((providers) => {
            providers.splice(providers.indexOf(provider), 1);
            this.storage.set('searchProviders', providers);
        });
    }


    cacheSearchResults(provider: SearchProvider, response): void {
        this.storage.set('cachedResults-' + provider.id, response);
    }

    getSearchProviders(): Promise<any> {
        console.log("Getting Search Providers Call");

        return this.storage.get('searchProviders').then((providers) => {
                if (providers === null) {
                    console.log("No Saved Providers");
                    fetch('/assets/data.json').then((response) => {
                            response.json().then((data) => {
                                console.log(data.searchProviders);
                                this.setSearchProviders(data.searchProviders);
                                return data.searchProviders;
                            });
                        }
                    );
                }
                else {
                    console.log("There were saved providers");
                    return providers;
                }
            }
        );
    }

    getSavedProvider(): Promise<any> {
        console.log("Getting Saved Provider");
        return this.storage.get('lastProvider').then((provider) => {
                //console.log(provider);
                if (provider === null || (Object.keys(provider).length === 0)) {
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
                    console.log(JSON.stringify(provider));
                    return provider;
                }
            }
        );
    }

    setSavedProvider(provider: SearchProvider): void {
        this.storage.set('lastProvider', provider);
    }

    setSearchProviders(providers: Array<SearchProvider>): void {
        this.storage.set('searchProviders', providers);
    }

}