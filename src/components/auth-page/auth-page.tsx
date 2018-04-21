import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'auth-page',
  styleUrl: 'auth-page.scss'
})

export class AuthPage {

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

          <div id='buttonBlock'>
            <ion-button onClick={() => this.login()} color='primary'>Enter a Seed</ion-button>
            <ion-button id='secondButton' onClick={() => this.loginAnon()}>Random Node</ion-button>
          </div>
        </ion-content>
      </ion-page>
    );
  }
}