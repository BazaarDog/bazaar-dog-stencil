import { Component } from '@stencil/core';

import { checkAnon } from '../../global/utils';

@Component({
  tag: 'bazaar-dog-stencil',
  styleUrl: 'bazaar-dog-stencil.scss'
})
export class StencilBeer {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>

          {checkAnon() ? <ion-route-redirect from='/favorites' to='/home'></ion-route-redirect> : null}

          <ion-route url='/' component='auth-page'></ion-route>
          <ion-route url='/home' component='tabs-page'>

            <ion-route component='feed-tab'>
               <ion-route component='feed-page'></ion-route>
               <ion-route url='/post/:post' component='post-detail'></ion-route>
            </ion-route>

            <ion-route component='listing-tab'>
              <ion-route component='listing-page' />
              <ion-route url='/listing/:beerId' component='listing-detail' />
            </ion-route>

            <ion-route component='profile-tab'>
              <ion-route url='/profiles' component='bar-page'></ion-route>
              <ion-route url='/profiles/detail/:peerID' component='profile-detail'></ion-route>
            </ion-route>

            <ion-route url='/favorites' component='favorites-page'></ion-route>
          </ion-route>

          <ion-route url='/profile' component='profile-page'></ion-route>
          <ion-route url='/users' component='users-page'></ion-route>
          <ion-route url='/users/:userName' component='user-profile'></ion-route>
          <ion-route url='/settings' component='settings-page'></ion-route>

        </ion-router>

        <ion-nav swipeBackEnabled={false} main></ion-nav>
      </ion-app>
    );
  }
}