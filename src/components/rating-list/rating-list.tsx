import { Component, Element, Prop } from '@stencil/core';

@Component({
    tag: 'rating-list',
    styleUrl: 'rating-list.scss'
})
export class RatingList {

    @Prop() ratingHashes: Array<string>;

    @Element() el: Element;

    componentDidload() {

    }

    goToUser(userName: string) {
        this.el.closest('ion-nav').push('user-profile', {userName});
    }

    render() {
        if (this.ratingHashes!==undefined && this.ratingHashes.length>0) {
            return (
                <ion-list>
                    {this.ratingHashes.map((ratingHash) => {
                        return (

                            <rating-item ratingHash={ratingHash}></rating-item>
                        )
                    })}
                </ion-list>
            )
        } else {
            return (
                <p>No ratings available</p>
            )
        }
    }
}