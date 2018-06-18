import {Component, Prop, State, Element} from '@stencil/core';

import {Thumbnails} from '../../global/interfaces';

@Component({
    tag: 'listing-slideshow',
    styleUrl: 'listing-slideshow.scss'
})
export class ListingSlideshow {

    @Element() el: HTMLElement;
    @State() gallery: Array<any>;

    @Prop({ context: 'IPFS_gateway' }) private ipfs_gateway: string;
    @Prop({ context: 'gateway' }) private gateway: string;
    @Prop() images: Array<Thumbnails>;

    render() {
        if (this.images !== undefined) {
            return ([
                <ion-grid>
                    <ion-row>
                        {
                            this.images.slice(0,1).map((img) => {
                                return (
                                    <ion-col col-12>
                                        <a data-fancybox="gallery"
                                           href={ img ? this.ipfs_gateway + `ipfs/` + img.large : '/assets/img/defaultItem.png'}>
                                            <img
                                                src={ img ? this.ipfs_gateway + `ipfs/` + img.large : '/assets/img/defaultItem.png'}
                                            />
                                        </a>
                                    </ion-col>
                                )
                                })
                                }
                    </ion-row>
                    <ion-row>
                        {
                            this.images.slice(1).map((img) => {
                                return (
                                    <ion-col col-4>
                                        <a data-fancybox="gallery" class="tiny"
                                           href={ img ? this.ipfs_gateway + `ipfs/` + img.large : '/assets/img/defaultItem.png'}>
                                            <img
                                                src={ img ? this.gateway + `ipfs/` + img.tiny : '/assets/img/defaultItem.png'}
                                            />
                                        </a>
                                    </ion-col>
                                )
                                })
                                }
                    </ion-row>
                </ion-grid>
            ])
        } else {
            return (
                <ion-slides>
                    <div >Unable to load images</div>
                </ion-slides>
            )
        }
    }
}