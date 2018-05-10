import {Component, Prop, State} from '@stencil/core';
import {LoadingController} from '@ionic/core';
import {Profile, Listing, Follower} from '../../global/interfaces';
import {
    getProfile,
    getListings,
    getRatingHashes
} from '../../global/http-service';
import {ToastController} from '@ionic/core';
// const { createProxyClient } = require('ipfs-postmsg-proxy');
// let node;

@Component({
    tag: 'profile-detail',
    styleUrl: 'profile-detail.scss'
})
export class ProfileDetail {

    // @Prop() match: any;

    @Prop({ context: 'IPNS_gateway' }) private ipns_gateway: string;
    @Prop({ context: 'gateway' }) private gateway: string;


    @State() detailRequest: any;

    @Prop() peerId: string;
    @Prop({ connect: 'ion-loading-controller' }) loadingCtrl: LoadingController;
    @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

    @State() profile: Profile;
    @State() listings: Array<Listing>;
    @State() ratingHashes: Array<string>;

    @State() followers: Array<Follower>;
    @State() following: Array<string>;

    loading: HTMLIonLoadingElement;

    async componentDidLoad() {
        this.loading = await this.loadingCtrl.create({
            content: 'loading detail...'
        });
        try {
            this.loading.present();
            this.profile = await getProfile(this.ipns_gateway, this.peerId);
            this.listings = await getListings(this.ipns_gateway, this.peerId);
            this.ratingHashes = await getRatingHashes(this.ipns_gateway, this.peerId);
            //this.followers = await getFollowers(this.gateway, this.peerId);
            //this.following = await getFollowing(this.gateway, this.peerId);
            this.loading.dismiss();
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
        if (this.profile !== null) {
            return (
                <ion-page>
                    <profile-header>
                        <ion-back-button defaultHref='/home'/>
                    </profile-header>
                    <ion-content>
                        <lazy-img id="bannerImg"
                                  src={this.profile ? this.gateway + 'ipfs/' + this.profile.headerHashes.medium : '/assets/img/defaultItem.png'}
                                  alt=''
                        />
                        <ion-grid>
                            <ion-row>
                                <ion-col col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7>
                                    <ion-card>
                                        <ion-card-content>
                                            <ion-item >
                                                <ion-avatar item-start>
                                                    <img
                                                        src={this.profile ? this.gateway + 'ipfs/' + this.profile.avatarHashes.tiny : '/assets/img/defaultItem.png'}/>
                                                </ion-avatar>
                                                <hr/>
                                                <p>{this.profile ? this.profile.location : ''}</p>
                                            </ion-item>
                                            <hr/>
                                            <ion-card-title>
                                                {this.profile ? this.profile.name : '' }
                                            </ion-card-title>
                                            <hr/>
                                            <h4>{this.profile ? this.profile.contactInfo.website : '' }</h4>
                                            <h4>{this.profile ? this.profile.contactInfo.email : '' }</h4>
                                        </ion-card-content>
                                    </ion-card>
                                    <store-list peerID={this.profile ? this.profile.peerID : null}
                                                listings={this.listings}></store-list>
                                </ion-col>
                                <ion-col col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5>
                                    <ion-card>
                                        <ion-card-content>
                                            <ion-card-title>
                                               About {this.profile ? this.profile.name : '' }
                                            </ion-card-title>

                                            <hr/>
                                            <div innerHTML={ this.profile ? this.profile.about : "... "}/>
                                        </ion-card-content>
                                    </ion-card>
                                    <ion-card>
                                        <ion-card-content>
                                            <ion-card-title>Ratings</ion-card-title>
                                            <rating-list ratingHashes={this.ratingHashes}/>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>

                            </ion-row>
                        </ion-grid>
                    </ion-content>
                </ion-page>
            );
        } else {
            return (
                <ion-page>
                    <profile-header>
                        <ion-back-button defaultHref='/home'/>
                    </profile-header>
                    <ion-content>
                        Loading
                    </ion-content>
                </ion-page>
            );
        }

    }
}