import {Component, Prop, State, Listen } from '@stencil/core';
import {PopoverController} from '@ionic/core';

import {checkAnon} from '../../global/utils';


@Component({
    tag: 'profile-header',
    styleUrl: 'profile-header.scss',
    scoped: true
})
export class ProfileHeader {

    popover: HTMLIonPopoverElement;

    @State() profilePic: string;

    @Prop({connect: 'ion-popover-controller'}) popoverCtrl: PopoverController;

    componentDidLoad() {
        this.profilePic = '/assets/img/defaultAvatar.png';
    }

    @Listen('body:closePopover')
    closePopover() {
        this.popover.dismiss();
    }



    async openPopover(event) {
        console.log(event);
        this.popover = await this.popoverCtrl.create({
            component: 'popover-page',
            ev: event
        });
        await this.popover.present();
    }


    render() {
        return (
            <ion-header md-height="96px">
                <ion-toolbar color='dark'>
                    <ion-buttons slot="start">
                        <slot></slot>
                    </ion-buttons>
                    <a href="/" >
                        <ion-title>Bazaar Dog</ion-title>
                    </a>
                    {checkAnon() ? null : <ion-buttons slot='end'>
                        <ion-button fill='clear' onClick={(ev) => this.openPopover(ev)} icon-only>
                            {this.profilePic ? <img id='userImage' src={this.profilePic} alt='user profile'></img> :
                                <div id='fake-image'></div>}
                        </ion-button>
                    </ion-buttons>}
                </ion-toolbar>
            </ion-header>
        );
    }
}