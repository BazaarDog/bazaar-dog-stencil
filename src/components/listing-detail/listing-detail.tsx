import {Component, Prop, State, Element} from '@stencil/core';
// import { MatchResults } from '@stencil/router';
import {ToastController} from '@ionic/core';

import {ListingFull, Profile} from '../../global/interfaces';
import {getListingDetail, getProfile, getRatingHashes} from '../../global/http-service';


@Component({
    tag: 'listing-detail',
    styleUrl: 'listing-detail.scss'
})
export class ListingDetail {


    @State() listing: ListingFull;
    @State() vendor: Profile;
    @State() ratingHashes: Array<string>;

    // @Prop() match: MatchResults;

    @Prop({ context: 'IPNS_gateway' }) private ipns_gateway: string;
    @Prop({ context: 'gateway' }) private gateway: string;

    @Prop({connect: 'ion-toast-controller'}) toastCtrl: ToastController;
    @Prop() slug: string;
    @Prop() peerId: string;

    @Element() el: Element;

    async componentDidLoad() {
        await this.setUpListing();
        await this.setUpVendor();
        await this.setUpRatings();
    }

    async setUpVendor() {
        try {
            this.vendor = await getProfile(this.ipns_gateway, this.peerId);
        }
        catch (err) {
            this.showErrorToast();
            console.log(err);
        }
    }

    async setUpListing() {
        try {
            let ListingFile = await getListingDetail(this.ipns_gateway, this.peerId, this.slug);
            this.listing = ListingFile.listing;
        }
        catch (err) {
            this.showErrorToast();
            console.log(err);
        }
    }


    async setUpRatings() {
        try {
            this.ratingHashes = await getRatingHashes(this.ipns_gateway, this.peerId, this.slug);
        }
        catch (err) {
            this.showErrorToast();
            console.log(err);
        }
    }

    async showErrorToast() {
        const toast = await this.toastCtrl.create({message: 'Error loading data', duration: 1000});
        toast.present();
    }

    getUrl() {
        return window.location.href;
    }

    async share() {
        await (navigator as any).share({
            title: document.title,
            text: "Check out this cool listing",
            url: `${window.location.href}/${this.peerId}/listing/${this.slug}`
        })

        const toast = await this.toastCtrl.create({message: 'listing shared', duration: 1000});
        toast.present();
    }

    navigateToProfile(peerId: string) {
        this.el.closest('ion-nav').push('profile-detail', {peerId});
    }


    render() {
        if (this.listing !== undefined && this.vendor !== undefined) {
            return (
                <ion-page class='show-page'>

                    <profile-header>
                        <ion-back-button defaultHref='/'/>
                    </profile-header>

                    <ion-content>

                        <lazy-img id="bannerImg"
                                  src={this.vendor.headerHashes ? this.gateway + 'ipfs/' + this.vendor.headerHashes.medium : '/assets/img/defaultItem.png'}
                                  alt=''
                        />
                        <ion-grid>

                            <ion-row>

                                <ion-col col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5>
                                    <ion-card>
                                        <ion-card-content>
                                            <listing-slideshow
                                                images={this.listing.item.images}></listing-slideshow>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>
                                <ion-col col-12 col-sm-9 col-md-6 col-lg-7 col-xl-7>
                                    <ion-card>
                                        <ion-card-content>
                                            <ion-item onClick={() => this.navigateToProfile(this.vendor.peerID)}>
                                                <ion-avatar item-start>
                                                    <img
                                                        src={this.vendor ? this.gateway + 'ipfs/' + this.vendor.avatarHashes.tiny : '/assets/img/defaultItem.png'}/>
                                                </ion-avatar>
                                                <h2>{this.vendor ? this.vendor.name : ''}</h2>
                                                <hr/>
                                                <p>{this.vendor ? this.vendor.location : ''}</p>
                                            </ion-item>
                                            <hr/>
                                            <ion-card-title>
                                                {this.listing.item ? this.listing.item.title : ''}

                                            </ion-card-title>
                                            <hr/>
                                            <div
                                                innerHTML={this.listing.item ? this.listing.item.description : ''}/>
                                        </ion-card-content>
                                    </ion-card>
                                    <ion-card>
                                        <ion-card-content>
                                            <ion-card-title>Ratings</ion-card-title>
                                            <rating-list ratingHashes={this.ratingHashes}/>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col col-12 col-sm-9 col-md-7 col-lg-7 col-xl-7>
                                    <ion-card>

                                        <ion-card-content>
                                            <ion-card-title>Refund Policy</ion-card-title>
                                            <div
                                                innerHTML={this.listing.refundPolicy ? this.listing.refundPolicy : 'No Refund Policy provided'}/>
                                        </ion-card-content>
                                    </ion-card>
                                    <ion-card>
                                        <ion-card-content>
                                            <ion-card-title>Terms &amp; Conditions</ion-card-title>
                                            <div
                                                innerHTML={this.listing.termsAndConditions ? this.listing.termsAndConditions : 'No Terms and Conditions entered'}/>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>
                                <ion-col col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5>

                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-content>

                    <ion-fab vertical='bottom' horizontal='right'>
                        <web-share title={"Open Bazaar: " + this.listing.item.title}
                                   text={this.listing.item.title.slice(0, 140)}
                                   url={this.getUrl()}>
                            <ion-fab-button >
                                <ion-icon name='share'></ion-icon>
                            </ion-fab-button>
                        </web-share>
                    </ion-fab>
                </ion-page>
            )
        }

    }
}