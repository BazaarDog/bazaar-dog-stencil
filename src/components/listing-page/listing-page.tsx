import {Component, Element, State, Prop, Listen} from '@stencil/core';
import {ToastController} from '@ionic/core';
import {ActiveRouter} from '@stencil/router';


import {
    Map,
    ListingCard,
} from '../../global/interfaces';

import{
    SearchProvider,
    SearchOptionInterface,
    SortByItems,
    PaginationInterface
} from '../../global/interfaces-app';

import {doSearch} from '../../global/http-service';

import SearchProviderService from '../../services/searchStorage';
import OfflineSearchService from '../../services/offlineSearch';

//import {unescape} from "querystring";

@Component({
    tag: 'listing-page',
    styleUrl: 'listing-page.scss'
})
export class ListingPage {

    private searchProviderService: SearchProviderService = new SearchProviderService();

    private offlineSearch: OfflineSearchService = new OfflineSearchService();


    page: number = 0;



    elements = [
        'search-menu',
    ];


    @State() isLeftSidebarIn: boolean;

    @State() listings: Array<ListingCard>;
    @State() pagination: PaginationInterface;
    @State() options: Map<SearchOptionInterface>;
    @State() param: Map<any>;
    @State() scroll: number;
    @State() sortBy: Map<SortByItems>;
    @State() storedSearchProvider: SearchProvider;
    @State() searchProviders: Array<SearchProvider>;

    @Prop({context: 'isServer'}) private isServer: boolean;
    @Prop({connect: 'ion-toast-controller'}) toastCtrl: ToastController;
    @Prop({context: 'activeRouter'}) activeRouter: ActiveRouter;

    @Element() el: Element;

    async componentDidLoad() {
        if (!this.isServer) {
            await this.setUpProviders();

            this.pagination = {
                'p': 0,
                'total': 0,
                'ps': 48,
                'more': false
            }
            this.param = {
                'q': "*",
                'p': 0,
                'ps': 48,
                'sortBy': '',
            };

            await this.setUpListings();
            this.isLeftSidebarIn = false;
            this.toggleLeftSidebar(false);
        }
    }

    async setUpProviders() {


        try {
            console.log("Loading Search Providers");
            this.searchProviders = await this.searchProviderService.getSearchProviders();
            console.log(this.searchProviders);
            this.storedSearchProvider = await this.searchProviderService.getSavedProvider();
        }
        catch (err) {
            this.searchProviders = [
                {
                    "id": "local",
                    "name": "Offline Cache",
                    "logo": "/assets/img/searchProviders/bazaarDogOffline.png",
                    "listings": "/search/",
                    "reports": "/reports/",
                    "torlistings": "/search/",
                    "enabled": true,
                    "cors": true
                }
            ];
            console.log("Error loading search providers" + err);
            this.showErrorToast();
        }

        if (this.storedSearchProvider == null) {
        }
    }
    async handleSearch(serviceUrl:string, param:any, cors:boolean, language: string ){
        if(serviceUrl==='/search/'){
            return await this.offlineSearch.search(param);
        } else{
            return await doSearch(
                serviceUrl,
                param,
                cors,
                language
            );
        }
    }

    async setUpListings() {

        if (this.storedSearchProvider === undefined) {
            this.storedSearchProvider = {
                "id": "bazaardog",
                "name": "Bazaar Dog",
                "logo": "/assets/img/searchProviders/bazaarDogLogo.png",
                "listings": "https://alpha.bazaar.dog/api/",
                "reports": "https://alpha.bazaar.dog/reports",
                "torlistings": "http://obfojhv6ay5fedog.onion/api/",
                "enabled": true,
                "cors": true
            }

        }

        try {
            // set up with first bit of content
            const data = await this.handleSearch(
                this.storedSearchProvider.listings,
                this.param,
                !this.storedSearchProvider.cors,
                navigator.language
            );
            this.options = data.options;
            this.sortBy = data.sortBy;
            var tmpResults = data.results;
            this.listings = tmpResults.results;
            this.setPagination(data.results);
        } catch (err) {
            console.log(err);
            this.showErrorToast();
        }
        // now lets init infiniteScrolling
        const iScroll: any = this.el.querySelector('#infinite-scroll');

        iScroll.addEventListener('ionInfinite', async () => {
            this.param['p'] = this.param['p'] + 1;
            try {
                const data = await this.handleSearch(
                    this.storedSearchProvider.listings,
                    this.param,
                    !this.storedSearchProvider.cors,
                    navigator.language
                );
                this.listings = this.listings.concat(data.results.results);
                iScroll.complete();
            }
            catch (err) {
                console.log(err);
                this.showErrorToast();
            }
        });


    }

    async showErrorToast() {
        const toast = await this.toastCtrl.create({message: 'Error loading data', duration: 4000});
        toast.present();
    }


    setPagination(res) {
        this.pagination.total = res.total;
        this.pagination.ps = this.param['ps'];
        this.pagination.p = this.param['p'];
        this.pagination.more = res.more;
    }

    @Listen('ionInput')
    search(ev) {
        this.listings = [];
        setTimeout(async () => {
            if (ev.target.value.length > 0) {
                try {
                    this.param['q'] = ev.target.value;
                    this.param['p'] = 0;
                    const data = await this.handleSearch(
                        this.storedSearchProvider.listings,
                        this.param,
                        !this.storedSearchProvider.cors,
                        navigator.language
                    );
                    this.options = data.options;
                    this.sortBy = data.sortBy;
                    this.listings = data.results.results;
                    this.setPagination(data.results);
                }
                catch (err) {
                    const data = await this.handleSearch(this.storedSearchProvider.listings,
                        {},
                        !this.storedSearchProvider.cors,
                        navigator.language
                    );
                    this.options = data.options;
                    this.sortBy = data.sortBy;
                    this.listings = data.results.results;
                    this.setPagination(data.results);

                }
            } else {
                this.param['q'] = "Qm";
                this.param['p'] = 0;
                const data = await this.handleSearch(
                    this.storedSearchProvider.listings,
                    this.param,
                    !this.storedSearchProvider.cors,
                    navigator.language
                );
                this.options = data.options;
                this.sortBy = data.sortBy;
                this.listings = data.results.results;
                this.setPagination(data.results);

            }
        }, 500);
    }


    navigateToProfile(peerId: string) {
        this.el.closest('ion-nav').push('profile-detail', {peerId});
    }

    @Listen('leftSidebarClick')
    handleToggle() {
        this.toggleLeftSidebar(true);
    }

    @Listen('window:resize')
    handleResize() {
        this.toggleLeftSidebar(false);
    }

    toggleLeftSidebar(ignoreWidth) {

        if (ignoreWidth) {
            this.isLeftSidebarIn ? this.makeContentOffset() : this.makeContentFullWidth();
        } else if (window.innerWidth < 768 && !this.isLeftSidebarIn) {
            this.makeContentFullWidth();
        } else if (window.innerWidth > 768 && this.isLeftSidebarIn) {
            this.makeContentOffset();
        }
        this.isLeftSidebarIn = !this.isLeftSidebarIn
    }

    makeContentFullWidth() {
        document.getElementById("content-area").classList.remove('content-menu-left');
        document.getElementById("content-area").classList.add('content-flush-left');
    }

    makeContentOffset() {
        document.getElementById("content-area").classList.add('content-menu-left');
        document.getElementById("content-area").classList.remove('content-flush-left');
    }

    scrollToTop() {
        document.getElementById("listing-topbar").scrollIntoView();

        console.log("scroll");
        window.requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        })
    }

    // Listen to the onSearchParamChange event from the option component
    @Listen('onSearchProviderChange')
    changeProvider(event) {
        console.log("onSearchProviderChange recieved by listing-page");
        event.stopPropagation();
        this.listings = [];
        this.scrollToTop();
        this.options = {};
        this.sortBy = {};

        this.storedSearchProvider = this.searchProviders.filter(function (obj) {
            return obj.id == event.detail;
        })[0];


        this.searchProviderService.setSavedProvider(this.storedSearchProvider);
        this.param = {'q': this.param['q'], 'p': 0};
        this.options = {};
        this.sortBy = {};
        this.setUpListings();
    }


    @Listen('onSearchParamChange')
    update(event) {
        //console.log("onSearchParamChange recieved by listing-page");
        this.listings = [];
        this.scrollToTop();
        this.param['p'] = 0;
        this.param[event.detail.param] = event.detail.value;
        setTimeout(async () => {
            try {
                const data = await this.handleSearch(
                    this.storedSearchProvider.listings,
                    this.param,
                    !this.storedSearchProvider.cors,
                    navigator.language
                );
                this.listings = data.results.results;
                this.setPagination(data.results);
            }
            catch (err) {
                const data = await this.handleSearch(
                    this.storedSearchProvider.listings,
                    {},
                    !this.storedSearchProvider.cors,
                    navigator.language
                );
                this.listings = data.results.results;
                this.setPagination(data.results);
            }
        }, 500);
    }

    render() {
        return (

            <ion-page class='show-page' onScroll={() => this.scrollToTop()}>

                <profile-header></profile-header>

                <ion-fab id="search-menu-fab" edge={true} horizontal='right' vertical='top'>
                    <ion-fab-button onClick={() => this.toggleLeftSidebar(true)} color='secondary'
                                    ion-fab>
                        <ion-icon name='options'></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-toolbar color='dark'>
                    <ion-searchbar></ion-searchbar>
                </ion-toolbar>


                <ion-content class="card-background-page">
                    <div>
                        <div id="search-menu" class="search-menu">
                            <br/><br/>
                            <search-provider storedSearchProvider={this.storedSearchProvider}
                                             searchProviders={this.searchProviders}></search-provider>
                            <hr/>
                            <br/>
                            <br/>
                            <search-menu options={this.options}></search-menu>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        </div>
                        <div id="content-area">
                            <ion-grid id="listing-topbar">
                                <ion-row>
                                    <ion-col>
                                        <sort-by-dropdown
                                            init={this.param ? this.param['sortBy'] : ''}
                                            options={this.sortBy}></sort-by-dropdown>
                                    </ion-col>
                                    <ion-col></ion-col>
                                    <ion-col></ion-col>
                                    <ion-col></ion-col>
                                    <ion-col>Results: { this.pagination ? this.pagination.total : 0 }</ion-col>

                                </ion-row>
                            </ion-grid>
                            <listing-list fave={false} listings={this.listings}></listing-list>
                            <ion-infinite-scroll id="infinite-scroll">
                                <ion-infinite-scroll-content
                                    loadingSpinner="bubbles"
                                    loadingText="Loading more data...">
                                </ion-infinite-scroll-content>
                            </ion-infinite-scroll>
                        </div>
                    </div>
                </ion-content>
                <ion-fab vertical='bottom' horizontal='right'>
                    <ion-fab-button onClick={() => this.scrollToTop()} color='primary'>
                        <ion-icon name='arrow-up'></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-page>
        );
    }
}