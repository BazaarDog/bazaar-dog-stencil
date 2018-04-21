import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { AlertController, ToastController } from '@ionic/core';

import { Listing } from '../../global/interfaces';
import { checkAnon } from '../../global/utils';

// import firebase from 'firebase';

declare var firebase: any;

@Component({
  tag: 'listing-item',
  styleUrl: 'listing-item.scss'
})
export class ListingItem {

  @Prop() listing: Listing;
  @Prop() fave: Boolean = false;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;
  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: AlertController;

  @Element() el: HTMLElement;

  @Event() listingDeleted: EventEmitter;

  io: IntersectionObserver;

  componentDidLoad() {
    this.addIntersectionObserver();
  }

  addIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data: IntersectionObserverEntry[]) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        if (data[0].isIntersecting) {
          this.handleAnimation(data[0].target);
          this.removeIntersectionObserver();
        }
      }, {
          threshold: [0.2]
        })

      this.io.observe(this.el.querySelector('ion-card'));
    } else {
      this.el.querySelector('ion-card').style.opacity = '1';
    }
  }

  removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  handleAnimation(element: any) {
    if ('animate' in element) {
      element.animate(
        [
          { transform: 'translateY(20px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 }
        ], {
          duration: 300,
          easing: 'cubic-bezier(.36,.66,.04,1)',
          fill: 'forwards'
        }
      )
    } else {
      this.el.querySelector('ion-card').style.opacity = '1';
    }
  }

  async save(listing: Listing) {
    console.log('here');
    if (!checkAnon()) {
      this.saveListing(listing);

      const toast = await this.toastCtrl.create({ message: 'listing favorited', duration: 1000 });
      toast.present();
    } else {
      const alert = await this.alertCtrl.create({
        title: 'Must login',
        message: 'This feature is not available to anonymous users. Would you like to sign in with Google?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            handler: () => {
              const provider = new firebase.auth.GoogleAuthProvider();
              firebase.auth().currentUser.linkWithRedirect(provider);
            }
          }
        ]
      });
      return await alert.present();
    }
  }

  async deleteListing(listing: Listing) {
    await this.deleteListingHelper(listing);

    this.listingDeleted.emit();

    const toast = await this.toastCtrl.create({ message: 'listing un-favorited', duration: 1000 });
    toast.present();
  }

  saveListing(value: Listing) {
    firebase.firestore().collection('savedListings').add({
      author: firebase.auth().currentUser.email,
      listing: value
    });
  }

  async deleteListingHelper(passedListing: Listing) {
    const doc = await firebase.firestore().collection('savedListings')
      .where('listing.name', '==', passedListing.name)
      .where('author', '==', (window as any).firebase.auth().currentUser.email)
      .get();

    doc.forEach((listing) => {
      listing.ref.delete();
    })
  }

  navigateToDetail(listingId: string) {

    this.el.closest('ion-nav').push('listing-detail', { listingId });
  }

  render() {
    return (
      <ion-card>
        <lazy-img src={this.listing.thumbnail ? this.listing.thumbnail.medium : '/assets/defaultItem.png'} alt='listing' />
        <ion-card-content>
          <ion-card-title>
            {this.listing.title}
          </ion-card-title>

          <!--p>
            {this.listing.description ? this.listing.description : 'No description available'}
          </p-->

          <ion-buttons>
            {this.fave ?
              <ion-button color='danger' onClick={() => this.deleteListing(this.listing)} fill='clear' icon-only>
                <ion-icon name='trash'></ion-icon>
              </ion-button>
              :
              <ion-button color='primary' onClick={() => this.save(this.listing)} fill='clear' icon-only>
                <ion-icon name='star'></ion-icon>
              </ion-button>
            }

            <share-button listing={this.listing}></share-button>

            <div id='anchorDiv'>
              <ion-anchor href={`/home/listing/${this.listing.slug}`}>
                <ion-button slot='end' onClick={() => this.navigateToDetail(this.listing.slug)} id='detailButton' color='primary' fill='clear'>
                  Detail
              </ion-button>
              </ion-anchor>
            </div>

          </ion-buttons>
        </ion-card-content>
      </ion-card>
    );
  }
}