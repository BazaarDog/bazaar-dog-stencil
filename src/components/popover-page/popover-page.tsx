import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { PopoverController } from '@ionic/core';

declare var firebase: any;

@Component({
  tag: 'popover-page',
  styleUrl: 'popover-page.scss'
})
export class PopoverPage {

  @Prop({ connect: 'ion-popover-controller' }) popoverCtrl: PopoverController;

  @Event() closePopover: EventEmitter;

  @Element() el: Element;

  openHome() {
    this.closePopover.emit();
    document.querySelector('ion-nav').push('home-page');

  }

  openProfile() {
    this.closePopover.emit();
    document.querySelector('ion-nav').push('profile-page');

  }

  openAll() {
    this.closePopover.emit();
    document.querySelector('ion-nav').push('users-page');
  }

  settings() {
    this.closePopover.emit();
    document.querySelector('ion-nav').push('settings-page');
  }

  async logout() {
    this.closePopover.emit();
    await firebase.auth().signOut();
    // this.history.replace('/', {});
    document.querySelector('ion-nav').setRoot('auth-page');
  }

  render() {
    return (
      <ion-list no-lines>
        <ion-item onClick={() => this.openHome()}><ion-label>Home</ion-label></ion-item>
        <ion-item onClick={() => this.openAll()}><ion-label>All Users</ion-label></ion-item>
        <ion-item onClick={() => this.settings()}><ion-label>Settings</ion-label></ion-item>
        <ion-item onClick={() => this.logout()}><ion-label color='danger'>Logout</ion-label></ion-item>
      </ion-list>
    );
  }
}