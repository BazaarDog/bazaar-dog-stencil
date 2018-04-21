import { Component, Prop } from '@stencil/core';
import { AlertController } from '@ionic/core';


@Component({
  tag: 'share-button',
  styleUrl: 'share-button.scss'
})
export class ShareButton {

  @Prop() listing: any;
  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: AlertController;

  async share(listing) {
    if ((navigator as any).share) {
      // have to catch here as web share
      // is available on desktop chrome
      // but fails
      try {
        this.handleNativeShare(listing);
      } catch (e) {
        this.handleTradShare(listing);
      }
    } else {
      this.handleTradShare(listing);
    }
  }

  handleTradShare(listing) {
    window.open(`http://twitter.com/share?text=Check this out!&url=${window.location.href}/detail/${listing.slug}`);
  }

  async handleNativeShare(listing) {
    console.log(listing);
    /*const alert = await this.alertCtrl.create({
      title: 'Share',
      message: 'Message to Share',
      inputs: [
        {
          name: 'shareText',
          id: 'shareText',
          placeholder: 'Check out this cool listing!'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          }
        }, {
          text: 'Ok',
          handler: () => {
            const shareText = (document.querySelector('#shareText') as HTMLInputElement).value;

            (navigator as any).share({
              title: document.title,
              text: `${shareText}`,
              url: `${window.location.href}/detail/${listing.id}`
            });
          }
        }
      ]
    });

    alert.present();*/
    (navigator as any).share({
      title: document.title,
      text: 'Check out this cool listing',
      url: `${window.location.href}/detail/${listing.slug}`
    })
  }

  render() {
    return (
      <ion-button color='secondary' onClick={() => this.share(this.listing)} fill='clear' icon-only>
        <ion-icon name='share'></ion-icon>
      </ion-button>
    );
  }
}