import { Component, State, Prop, Listen } from '@stencil/core';
import { ToastController } from '@ionic/core';

import { Profile } from '../../global/interfaces';

@Component({
  tag: 'profile-page',
  styleUrl: 'profile-page.scss'
})
export class ProfilePage {

  @State() profiles: Array<Profile>;

  @Prop({ context: 'isServer' }) private isServer: boolean;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  componentDidLoad() {
    if (!this.isServer) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        try {
          this.getProfiles(position);
        }
        catch (err) {
          this.showErrorToast();
        }
      });
    }
  }

  async showErrorToast() {
    const toast = await this.toastCtrl.create({ message: 'Error loading data', duration: 1000 });
    toast.present();
  }

  async getProfiles(position: Position) {
    const response = await fetch('/googlePlaces', {
      method: 'post',
      body: JSON.stringify({ lat: position.coords.latitude, long: position.coords.longitude })
    })
    const data = await response.json();
    console.log(data);

    this.profiles = data;
  }

  @Listen('ionInput')
  search(ev) {
    setTimeout(() => {
      const term = ev.detail.target.value;
      console.log(term);
      console.log(this.profiles);

      this.profiles = this.profiles.filter((profile) =>
        profile.name.toLowerCase().indexOf(term.toLowerCase()) > -1
      );
    }, 1000);
  }

  render() {
    return (
      <ion-page class='show-page'>
        <profile-header>
        </profile-header>

        <ion-toolprofile color='dark'>
          <ion-searchprofile></ion-searchprofile>
        </ion-toolprofile>

        <ion-content>
          <profile-list profiles={this.profiles}></profile-list>
        </ion-content>
      </ion-page>
    );
  }
}