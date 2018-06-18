import greenlet from 'greenlet';
import {Rating} from "./interfaces";


const getProfile = greenlet(
    function (gateway: string, peerID: string) {
        const url = gateway + `ipns/${peerID}/profile.json`;
        return fetch(url).then((res) => {
            return res.json()
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.error(err);
            return null;
        })
    }
);

const getListings = greenlet(
    function (gateway: string, peerID: string) {
        const url = gateway + `ipns/${peerID}/listings.json`;
        return fetch(url).then((res) => {
            return res.json()
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.error(err);
            return null;
        })
    }
);

const getRatingHashes = greenlet(
    function (gateway: string, peerID: string, slug: string) {
        const url = gateway + `ipns/${peerID}/ratings.json`;
        return fetch(url).then((res) => {
            return res.json()
        }).then((data:Array<Rating>) => {
            if(slug!==undefined && slug.length>0){
                let itemRatings = data.filter(function (obj) {
                    return obj.slug == slug;
                })[0];
                if(itemRatings!==undefined){
                    return itemRatings.ratings;
                }else{
                    return []
                }
            }else{
                let allRatings = [];
                for(var r of data){
                    allRatings = allRatings.concat(r.ratings);
                }
                return allRatings;
            }
        }).catch((err) => {
            console.error(err);
            return null;
        })
    }
);

const getRating = greenlet(
    function (gateway: string, ratingHash: string) {
        const url = gateway + `ipfs/${ratingHash}`;
        return fetch(url).then((res) => {
            return res.json()
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.error(err);
            return null;
        })
    }
);

const getFollowers = greenlet(
    function (gateway: string, peerID: string) {
        const url = gateway + `ipns/${peerID}/followers.json`;
        return fetch(url).then((res) => {
            return res.json()
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.error(err);
            return null;
        })
    }
);

const getFollowing = greenlet(
    function (gateway: string, peerID: string) {
        const url = gateway + `ipns/${peerID}/following.json`;
        return fetch(url).then((res) => {
            return res.json()
        }).then((data) => {
            return data;
        })
    }
);

const getListingDetail = greenlet(
    function (gateway: string, peerID: string, slug: string) {
        const url = gateway + `ipns/${peerID}/listings/${slug}.json`;
        return fetch(url).then((res) => {
            return res.json()
        }).then((data) => {
            return data;
        }).catch((err) => {
            console.error(err);
            return null;
        })
    }
);

const doSearch = greenlet(

    function (serviceUrl: string, params: Object, cors: boolean, language: string) {

        var serviceUrl :string = serviceUrl === undefined ? '' : serviceUrl;
        var params = params === undefined ? {} : params;
        var cors = cors === undefined ? true : cors;


        let headers =  new Headers({
            "Accept-Language": language,
        });

        let url = ``;
        // override cors of search provider with proxy
        if (cors == true) {
            url += `https://cors-anywhere.herokuapp.com/`;
        }

        url += serviceUrl;

        url += '?' + Object.keys(params).reduce(function (a, k) {
                a.push(k + '=' + encodeURIComponent(params[k]));
                return a
            }, []).join('&');

        return fetch(url,{headers:headers}).then((res) => {
            return res.json()
        }).then((data) => {
            return data;
        })
    }
);

export {
    getProfile,
    getListings,
    getRatingHashes,
    getRating,
    getFollowers,
    getFollowing,
    doSearch,
    getListingDetail
};