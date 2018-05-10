import {Component, Prop, Element, Event, EventEmitter} from '@stencil/core';
import {AlertController, ToastController} from '@ionic/core';

import {Listing} from '../../global/interfaces';
//import {checkAnon} from '../../global/utils';


@Component({
    tag: 'store-item',
    styleUrl: 'store-item.scss'
})

export class ListingItem {



    @Prop() peerID: string;
    @Prop() listing: Listing;
    @Prop() fave: Boolean = false;
    @Prop({ context: 'gateway' }) private gateway: string;
    @Prop({ connect: 'ion-toast-controller'}) toastCtrl: ToastController;
    @Prop({ connect: 'ion-alert-controller'}) alertCtrl: AlertController;

    @Element() el: HTMLElement;

    @Event() listingDeleted: EventEmitter;



    componentDidLoad() {

    }




    async save(listing: Listing) {
        console.log('here');
            this.saveListing(listing);
            const toast = await this.toastCtrl.create({message: 'listing favorited', duration: 1000});
            toast.present();

    }

    async deleteListing(listing: Listing) {
        await this.deleteListingHelper(listing);

        this.listingDeleted.emit();

        const toast = await this.toastCtrl.create({message: 'listing un-favorited', duration: 1000});
        toast.present();
    }

    saveListing(value: Listing) {
        console.log(value)
        // TODO refactor for local storage
        //firebase.firestore().collection('savedListings').add({
        //    author: firebase.auth().currentUser.email,
        //    listing: value
        //});
    }

    async deleteListingHelper(passedListing: Listing) {
        console.log(passedListing.title)
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
        this.el.closest('ion-nav').push('listing-detail', {peerId, slug});
    }

    navigateToProfile(peerId: string) {
        this.el.closest('ion-nav').push('profile-detail', {peerId});
    }

    render() {
        return (
            <ion-card>
                <lazy-img class='store-item-cover'
                    src={this.listing.thumbnail ? this.gateway + 'ipfs/' + this.listing.thumbnail.small : '/assets/img/defaultItem.png'}
                    alt={'A nice picutre of: ' + this.listing.slug}
                    onClick={() => this.navigateToDetail(this.peerID, this.listing.slug)}
                />
                <ion-card-content >
                    <p>
                        {this.listing.title}
                    </p>

                    <ion-buttons>

                        <span id='infoDiv'>
                        <ion-buttons>
                            <ion-button color='primary'
                                        onClick={() => this.navigateToDetail(this.peerID, this.listing.slug)}
                                        fill='clear' icon-only>
                                {this.listing.averageRating.toPrecision(2)}
                                <ion-icon name='star'>
                                </ion-icon>
                                ({this.listing.ratingCount})
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
                                id="priceLabel"> {this.listing.price.amount / 100} {this.listing.price.currencyCode}</span>
                        </ion-buttons>
                            <div>
                            <p id="vendorName"> </p>
                            </div>

                        </span>

                    </ion-buttons>
                </ion-card-content>
            </ion-card>
        );
    }
}