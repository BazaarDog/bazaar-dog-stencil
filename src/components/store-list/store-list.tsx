import { Component, Prop } from '@stencil/core';

import {Listing} from '../../global/interfaces';


@Component({
  tag: 'store-list',
  styleUrl: 'store-list.scss'
})
export class StoreList {

  @Prop() listings: Array<Listing>;
  @Prop() peerID: string;
  @Prop() fave: Boolean;

  render() {
    if (this.listings) {
      const listings = this.listings.map((listing) => {
        return (
          <store-item fave={this.fave} peerID={this.peerID} listing={listing} ></store-item>
        )
      });

      return (
        <ion-list >
          {listings}
        </ion-list>
      )
    } else {
      return (
        <ion-list>
          <div > No Results</div>
        </ion-list>
      )
    }
  }
}