import { Component, State, Listen } from '@stencil/core';

import { ListingCard } from '../../global/interfaces';

declare var firebase: any;

@Component({
  tag: 'favorites-page',
  styleUrl: 'favorites-page.scss'
})
export class favoritesPage {

  @State() listings: Array<ListingCard>;

  async componentDidLoad() {
    const tempListings = [];
    

    this.getSavedListings().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempListings.push(doc.data().listing);
      })

      this.listings = tempListings;
    })
  }

  getSavedListings() {
    return firebase.firestore().collection('savedListings').where('author', '==', firebase.auth().currentUser.email).get();
  }

  @Listen('listingDeleted')
  getFreshListings() {
    const tempListings = [];

    this.getSavedListings().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tempListings.push(doc.data().listing);
      })

      this.listings = tempListings;
    })
  }

  render() {
    return (
      <ion-page class='show-page'>
        <profile-header>
        </profile-header>

        <ion-content>
          <listing-list fave={true} listings={this.listings}></listing-list>
        </ion-content>
      </ion-page>
    );
  }
}