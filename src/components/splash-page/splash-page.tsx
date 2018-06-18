import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'splash-page',
  styleUrl: 'splash-page.scss'
})

export class SplashPage {

  @Prop({ context: 'isServer' }) private isServer: boolean;

  @Element() el: Element;

  componentDidLoad() {
    if (!this.isServer) {
      console.log('did load');

      this.el.closest('ion-nav').setRoot('tabs-page', null, { animate: true, direction: 'forward' });
    }
  }

  login() {
    console.log(location.protocol);
  }

  async loginAnon() {
    try {
      console.log("annon loging");
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <ion-page class='show-page'>
        <ion-content>

          <div id='imageBlock'>
            <img id='iconImage' src='/assets/img/icon.png' alt='logo'></img>

            <h1>BazaarDog</h1>
          </div>


          <ion-card>
            <img src="assets/img/Paisaje.png"/>
            <div class="card-title">Explore</div>
            <div class="card-subtitle">Search Listings on the Open Bazaar network</div>
          </ion-card>

          <ion-card>
            <img src="assets/img/splashdown.jpg"/>
            <div class="card-title">Welcome</div>
            <div class="card-subtitle">Explore Bazaar Dog</div>
          </ion-card>


          <div id='buttonBlock'>
            <ion-button onClick={() => this.login()} color='primary'>Enter a Seed</ion-button>
            <ion-button id='secondButton' onClick={() => this.loginAnon()}>Random Node</ion-button>
          </div>
        </ion-content>
      </ion-page>
    );
  }
}