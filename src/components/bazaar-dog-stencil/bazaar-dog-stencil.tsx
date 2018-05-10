import {Component} from '@stencil/core';

import {checkAnon} from '../../global/utils';

@Component({
    tag: 'bazaar-dog-stencil',
    styleUrl: 'bazaar-dog-stencil.scss'
})

export class BazaarDogStencil {

    render() {
        return (
            <ion-app>
                <ion-router useHash={false}>

                    {checkAnon() ? <ion-route-redirect from='/favorites' to='/home'></ion-route-redirect> : null}

                    <ion-route url='/splash' component='splash-page'></ion-route>
                    <ion-route url='/' component='tabs-page'>
                        <ion-route component='listing-tab'>
                            <ion-route url='' component='listing-page'/>
                            <ion-route url='/ob/:peerId' component='profile-detail'></ion-route>
                            <ion-route url='/ob/:peerId/listings/:slug' component='listing-detail'></ion-route>

                        </ion-route>
                        <ion-route component='feed-tab'>
                            <ion-route component='feed-page'></ion-route>
                            <ion-route url='post/:post' component='post-detail'></ion-route>
                        </ion-route>
                        <ion-route component='profile-tab'>
                            <ion-route url='profiles' component='profile-page'></ion-route>
                        </ion-route>
                        <ion-route url='/favorites' component='favorites-page'></ion-route>
                        <ion-route component='store'>
                        </ion-route>

                        <ion-route url='/myprofile' component='home-page'></ion-route>
                        <ion-route url='/users' component='users-page'></ion-route>
                        <ion-route url='/users/:userName' component='user-profile'></ion-route>
                        <ion-route url='/settings' component='settings-page'></ion-route>
                    </ion-route>

                </ion-router>
                <ion-nav swipeBackEnabled={true} main>
                </ion-nav>
            </ion-app>
        );
    }
}