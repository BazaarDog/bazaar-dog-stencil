import  CachingSearchAPI  from '../assets/js/bazaar-dog-offline.es5.js';

export default class OfflineSearchService {

    public api:CachingSearchAPI = new CachingSearchAPI();

    constructor() {
     this.api.setup();
     console.log("Initializing offline search....");
    }

    search(params: any): Promise<any> {
        if(params['q']==='*'){
            params['q'] = 'Qm';
        }
        return this.api.buildResponse(params);
    }
}
