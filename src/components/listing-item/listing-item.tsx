import {Component, Prop, Element, Event, State, EventEmitter} from '@stencil/core';
import {AlertController, ToastController} from '@ionic/core';

import {ListingCard} from '../../global/interfaces';
//import {checkAnon} from '../../global/utils';
import { ActiveRouter } from '@stencil/router';

@Component({
    tag: 'listing-item',
    styleUrl: 'listing-item.scss'
})

export class ListingItem {

    @State() gateway: string = 'https://gateway.ob1.io/';

    @Prop() listing: ListingCard;
    @Prop() fave: Boolean = false;
    @Prop({connect: 'ion-toast-controller'}) toastCtrl: ToastController;
    @Prop({connect: 'ion-alert-controller'}) alertCtrl: AlertController;
    @Prop({ context: 'activeRouter' }) activeRouter: ActiveRouter;

    @Element() el: HTMLElement;

    @Event() listingDeleted: EventEmitter;

    io: IntersectionObserver;

    componentDidLoad() {

    }


    removeIntersectionObserver() {
        if (this.io) {
            this.io.disconnect();
            this.io = null;
        }
    }



    async save(listing: ListingCard) {
        console.log('here');
        this.saveListing(listing);
        const toast = await this.toastCtrl.create({message: 'listing favorited', duration: 1000});
        toast.present();

    }

    async deleteListing(listing: ListingCard) {
        await this.deleteListingHelper(listing);

        this.listingDeleted.emit();

        const toast = await this.toastCtrl.create({message: 'listing un-favorited', duration: 1000});
        toast.present();
    }

    saveListing(value: ListingCard) {
        console.log(value)
        // TODO refactor for local storage
        //firebase.firestore().collection('savedListings').add({
        //    author: firebase.auth().currentUser.email,
        //    listing: value
        //});
    }

    async deleteListingHelper(passedListing: ListingCard) {
        console.log(passedListing.data.title)
        // TODO refactor for local storage
        //const doc = await firebase.firestore().collection('savedListings')
        //    .where('listing.title', '==', passedListing.data.title)
        //    .where('author', '==', (window as any).firebase.auth().currentUser.email)
        //    .get();

        //doc.forEach((listing) => {
        //    listing.ref.delete();
        //})
    }

    navigateToDetail(peerId: string, slug: string) {
        this.el.closest('ion-nav').push('listing-detail', {'peerId':peerId,'slug':slug});
    }

    navigateToProfile(peerId: string) {
        this.el.closest('ion-nav').push('profile-detail', {'peerId':peerId});
    }



    render() {
        return (
            <ion-card>

                    <lazy-img class='listing-item-cover'
                              src={this.listing.data.thumbnail ? this.gateway + 'ipfs/' + this.listing.data.thumbnail.small : '/assets/img/defaultItem.png'}
                              alt='listing'
                              onClick={() => this.navigateToDetail(this.listing.relationships.vendor.data.peerID, this.listing.data.slug)}

                    />
                <ion-card-content >
                    <p>
                        {this.listing.data.title}
                    </p>

                    <ion-buttons>

                            <div class='avatarDiv'>
                                <lazy-img class="avatarImg"
                                          src={this.listing.relationships.vendor.data.avatarHashes.tiny ? this.gateway + 'ipfs/' + this.listing.relationships.vendor.data.avatarHashes.tiny : '/assets/img/defaultAvatar.png'}
                                          alt=''
                                          onClick={() => this.navigateToProfile(this.listing.relationships.vendor.data.peerID)}
                                />
                            </div>



                        <span class='infoDiv'>
                        <ion-buttons>
                            <ion-button color='primary'
                                        onClick={() => this.navigateToDetail(this.listing.relationships.vendor.data.peerID, this.listing.data.slug)}
                                        fill='clear' icon-only>
                                {this.listing.data.averageRating.toPrecision(2)}
                                <ion-icon name='star'>
                                </ion-icon>
                                ({this.listing.data.ratingCount})
                            </ion-button>
                            {this.fave ?
                                <ion-button color='danger' onClick={() => this.deleteListing(this.listing)} fill='clear'
                                            icon-only>
                                    <ion-icon name='trash'></ion-icon>
                                </ion-button>
                                :
                                <ion-button color='primary' onClick={() => this.save(this.listing)} fill='clear'
                                            icon-only>
                                    <ion-icon name='bookmark'></ion-icon>
                                </ion-button>
                            }

                            <span
                                class="priceLabel"> {this.listing.data.price.amount / 100} {this.listing.data.price.currencyCode}</span>
                        </ion-buttons>
                            <div>
                            <p class="vendorName"> {this.listing.relationships.vendor.data.name}</p>
                            </div>

                        </span>

                    </ion-buttons>
                </ion-card-content>
            </ion-card>
        );
    }
}