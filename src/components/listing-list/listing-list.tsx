import {Component, Prop} from '@stencil/core';

import {ListingCard} from '../../global/interfaces';


@Component({
    tag: 'listing-list',
    styleUrl: 'listing-list.scss'
})
export class ListingList {

    @Prop() listings: Array<ListingCard>;
    @Prop() fave: Boolean;


    scrollToTop() {
        console.log("scrollToTop");
        console.log("scroll was at " + document.getElementById("list-area").scrollTop);
        document.getElementById("list-area").scrollTo(0, 0);
        //const iScroll: any = this.el.querySelector('#list-area');
        //console.log("scroll was at "+ iScroll.scrollTop);
        //iScroll.scrollTop = 0;
        //document.getElementById("list-area").scrollTo(0,0);
    }

    render() {
        if (this.listings) {
            const listings = this.listings.map((listing) => {
                return (
                    <listing-item fave={this.fave} listing={listing}></listing-item>
                )
            });

            return (
                    <ion-list id="list-area" >
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