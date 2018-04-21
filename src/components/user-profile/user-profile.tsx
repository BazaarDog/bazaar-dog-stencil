import { Component, Prop, State } from '@stencil/core';

declare var firebase: any;

@Component({
  tag: 'user-profile',
  styleUrl: 'user-profile.scss'
})
export class UserProfile {

  @Prop() userName: any;

  @State() listings: any;
  @State() user: any;

  async componentDidLoad() {
    const allData = await this.getFullUser(this.userName);

    if (allData[1].length > 0) {
      this.listings = allData[1];
    }
    console.log(this.listings);
    this.user = allData[0];
  }

  getUserListings(email) {
    return firebase.firestore().collection('savedListings').where('author', '==', email).get();
  }

  async getFullUser(name) {
    console.log(name);
    const fullUser = [];
    let userEmail = null;
  
    const doc = await firebase.firestore().collection('users').where('name', '==', name).get();
  
    await doc.forEach((user) => {
      console.log(user);
      fullUser.push(user.data());
      userEmail = user.data().email;
    })
  
    const tempListings = [];
  
    const listingDoc = await this.getUserListings(userEmail)
  
    await listingDoc.forEach((doc) => {
      tempListings.push(doc.data().listing);
    })
  
    fullUser.push(tempListings);
  
    console.log(fullUser);
    return fullUser;
  }

  async follow() {
    // const currentUser = firebase.auth().currentUser;
    const doc = await firebase.firestore().collection('users').where('name', '==', this.userName).get();

    await doc.forEach((user) => {
      console.log(user.data());
    });
  }

  render() {
    if (this.user) {
      return (
        <ion-page class='show-page'>
          <profile-header>
            <ion-back-button defaultHref='/home' />
          </profile-header>

          <ion-content>
            <div id='imageBlock'>
              <img src={this.user.photo}></img>
            </div>

            <h2>{this.user.name}</h2>

            {/*<ion-button expand='block' color='primary' onClick={() => this.follow()}>Follow</ion-button>*/}

            {this.listings ?
              <h1>Favorite Listings</h1>
              : null
            }

            {this.listings ?
              <listing-list listings={this.listings} fave={false}></listing-list>
              : null
            }

          </ion-content>
        </ion-page>
      );
    } else {
      return (
        <ion-page class='show-page'>
          <profile-header>
            <ion-back-button defaultHref='/home' />
          </profile-header>

          <ion-content>
            <div id='fake-card'></div>
          </ion-content>
        </ion-page>
      )
    }
  }
}