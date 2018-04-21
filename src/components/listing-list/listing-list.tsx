import { Component, Prop } from '@stencil/core';

import {ListingCard} from '../../global/interfaces';


@Component({
  tag: 'listing-list',
  styleUrl: 'listing-list.scss'
})
export class ListingList {

  @Prop() listings: Array<ListingCard>;
  @Prop() fave: Boolean;

  render() {
    if (this.listings) {
      const listings = this.listings.map((listing) => {
        return (
          <listing-item fave={this.fave} listing={listing} ></listing-item>
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