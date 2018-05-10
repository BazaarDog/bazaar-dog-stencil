import {Component, Prop, Element, Event, State, EventEmitter} from '@stencil/core';
import {ToastController} from '@ionic/core';

import {RatingDetail} from '../../global/interfaces';
import {getRating} from '../../global/http-service';


@Component({
    tag: 'rating-item',
    styleUrl: 'rating-item.scss'
})

export class RatingItem {


    @Prop({ context: 'IPFS_gateway' }) private ipfs_gateway: string;

    @Prop() ratingHash: string;
    @State() rating: RatingDetail;
    @Prop({connect: 'ion-toast-controller'}) toastCtrl: ToastController;

    @Element() el: HTMLElement;

    @Event() listingDeleted: EventEmitter;

    io: IntersectionObserver;

    async componentDidLoad() {
        await this.setUpRating();
    }


    async setUpRating() {
        try {
            this.rating = await getRating(this.ipfs_gateway, this.ratingHash);
        }
        catch (err) {
            this.showErrorToast();
            console.log(err);
        }
    }

    async showErrorToast() {
        const toast = await this.toastCtrl.create({message: 'Error loading data', duration: 1000});
        toast.present();
    }


    render() {
        if (this.rating) {
            return ([
                    <ion-item>
                        <div class='review-item-points' slot='start'>
                            <am-rating colorOn='#FFEB3B' rating={this.rating.ratingData.overall} max-rating='5'>Overall</am-rating>
                            <am-rating colorOn='#FFEB3B' rating={this.rating.ratingData.deliverySpeed} max-rating='5'>Speed</am-rating>
                            <am-rating colorOn='#FFEB3B' rating={this.rating.ratingData.customerService} max-rating='5'>Service</am-rating>
                            <am-rating colorOn='#FFEB3B' rating={this.rating.ratingData.description} max-rating='5'>Accuracy</am-rating>
                            <am-rating colorOn='#FFEB3B' rating={this.rating.ratingData.quality} max-rating='5'>Quality</am-rating>
                        </div>
                        <div class='review-item-info'>
                            <ion-label>
                                {this.rating.ratingData.buyerName ? this.rating.ratingData.buyerName : "Anonymous"}
                                <h3>{this.rating.ratingData.timestamp}</h3>
                            </ion-label>
                            <p>{this.rating.ratingData.review}</p>
                        </div>
                    </ion-item>,
                <hline/>
                ]
            );
        }
        {
            return (
                    <ion-item>
                        <h2>...</h2>
                    </ion-item>
            );
        }

    }
}