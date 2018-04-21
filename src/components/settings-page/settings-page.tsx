import {Component, Prop, State} from '@stencil/core';

import {ToastController, AlertController} from '@ionic/core';

import {formatBytes} from '../../global/utils';


@Component({
    tag: 'settings-page',
    styleUrl: 'settings-page.scss'
})
export class SettingsPage {

    @State() storageUsed: string = '0';
    @State() offlineChecked: boolean;
    @State() selectValue: string;

    @Prop({connect: 'ion-toast-controller'}) toastCtrl: ToastController;
    @Prop({connect: 'ion-alert-controller'}) alertCtrl: AlertController;

    async componentDidLoad() {
        if ((navigator as any).storage) {
            const estimate = await (navigator as any).storage.estimate();
            this.storageUsed = formatBytes(estimate.usage);
        }

        this.checkState();
    }

    checkState() {
        const offlineState = localStorage.getItem('offlineEnabled');
        console.log(offlineState);
        if (offlineState === 'true') {
            this.offlineChecked = true;
        } else {
            this.offlineChecked = false;
            console.log('here');
        }
    }

    handleSelect(event) {
        console.log(event.target.value);
        this.selectValue = event.target.value;
    }


    async enableOffline() {
        console.log('offline');
        try {
            //await firebase.firestore().enablePersistence();
            const toast = await this.toastCtrl.create({message: 'Advanced Offline Mode enabled', duration: 1000});
            toast.present();
        } catch (err) {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
                const toast = await this.toastCtrl.create({
                    message: 'Error enabling Advanced Offline Mode',
                    duration: 1000
                });
                toast.present();
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
                const toast = await this.toastCtrl.create({message: 'Not supported in your browser', duration: 1000});
                toast.present();
            }
        }
    }


    getSearchProvider() {
        const searchProvider = localStorage.getItem('searchProvider');
        console.log(searchProvider);
        return 'dog';
    }


    async disableOffline() {
        //await firebase.firestore().enableNetwork();
        const toast = await this.toastCtrl.create({message: 'Advanced Offline Mode disabled', duration: 1000});
        toast.present();
    }


    async changed(ev) {
        console.log(ev);
        /*if (ev.target.checked === true) {
         const alert = await this.alertCtrl.create({
         title: 'Are you sure?',
         message: 'Advanced Offline Mode will use more storage on your device',
         buttons: [
         {
         text: 'Cancel',
         role: 'cancel',
         cssClass: 'secondary',
         handler: () => {
         console.log('Confirm Cancel: blah');
         this.offlineChecked = false;
         }
         }, {
         text: 'Enable',
         handler: () => {
         this.enableOffline();
         localStorage.setItem('offlineEnabled', 'true');
         }
         }
         ]
         });
         return await alert.present();
         } else if (ev.target.checked === false) {
         this.disableOffline();
         localStorage.setItem('offlineEnabled', 'false');
         }*/
    }

    render() {
        return (
            <ion-page>

                <profile-header>
                    <ion-back-button defaultHref='/home'/>
                </profile-header>

                <ion-content>
                    <ion-list no-lines>
                        <ion-item>
                            <ion-label>
                                <h2>Storage Used</h2>
                                <p>{this.storageUsed}</p>
                            </ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>
                                <h2>Advanced Offline Mode</h2>
                                <p>Use if you are frequently offline</p>
                            </ion-label>
                            <ion-buttons>
                                <ion-toggle onChange={(event) => this.changed(event)}
                                            checked={this.offlineChecked}></ion-toggle>
                            </ion-buttons>
                        </ion-item>
                        <ion-list radio-group>
                            <ion-list-header>
                                <ion-label>
                                    <h2>Search Provider</h2>
                                    <p>Select your preferred search provider</p>
                                </ion-label>
                            </ion-list-header>

                            <ion-item>
                                <ion-label>Bazaar Dog</ion-label>
                                <ion-radio value="dog" checked={true}></ion-radio>
                            </ion-item>

                            <ion-item>
                                <ion-label>OB1</ion-label>
                                <ion-radio value="ob1" disabled={true}></ion-radio>
                            </ion-item>

                            <ion-item>
                                <ion-label>BlockBooth</ion-label>
                                <ion-radio value="blockbooth" disabled={true}></ion-radio>
                            </ion-item>
                            <ion-item>
                                <ion-label>On The Blockchain</ion-label>
                                <ion-radio value="otb" disabled={true}></ion-radio>
                            </ion-item>
                            <ion-item>
                                <ion-label>RawFlood</ion-label>
                                <ion-radio value="rawflood" disabled={true}></ion-radio>
                            </ion-item>
                        </ion-list>
                    </ion-list>
                </ion-content>
            </ion-page>
        );
    }
}

// https://bazaar.dog
// https://search.ob1.io/search/listings
// https://search.blockbooth.com/api/
