import { Component } from '@stencil/core';

import { checkAnon } from '../../global/utils';

@Component({
  tag: 'tabs-page',
  styleUrl: 'tabs-page.scss'
})
export class TabsPage {

  render() {
    return (
      <ion-tabs color='dark'>
        <ion-tab title='feed' icon='paper' name='feed-tab'>
          <ion-nav></ion-nav>
        </ion-tab>

        <ion-tab selected={true} title='listings' icon='shirt' name='listing-tab'>
          <ion-nav></ion-nav>
        </ion-tab>

        <ion-tab title='peers' icon='people' name='profile-tab'>
          <ion-nav></ion-nav>
        </ion-tab>

        {checkAnon() ? null : <ion-tab title='favorites' icon='star' component='favorites-page'>
        </ion-tab>}
      </ion-tabs>
    );
  }
}