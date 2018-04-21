import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { AlertController } from '@ionic/core';



@Component({
  tag: 'feed-page-modal',
  styleUrl: 'feed-page-modal.scss'
})
export class FeedPageModal {

  @State() postValue: string;
  @State() beerNameValue: string;
  @State() ratingValue: number = 0;
  @State() imageSrc: string;

  @Prop({ connect: 'ion-alert-controller' }) alertCtrl: AlertController;

  @Element() el: Element;

  storage: any;
  rootRef: any;
  imageRef: any;
  fileToUpload: File;

  componentDidLoad() {
    this.storage = null //firebase.storage();
    this.rootRef = this.storage.ref();
  }

  dismiss() {
    (this.el.closest('ion-modal') as HTMLIonModalElement).dismiss();
  }

  handlePostValue(event) {
    this.postValue = event.target.value;
    console.log(this.postValue);
  }

  handleBeerNameValue(event) {
    this.beerNameValue = event.target.value;
  }

  @Listen('ionChange')
  handleRatingValue(event) {
    console.log('I got an event', event);
    console.log(event.target.localName);
    if (event.target.localName === 'ion-range') {
      console.log(event.detail.value);
      this.ratingValue = event.detail.value;
    }
  }

  takePicture() {
    console.log('take picture');
    const input = document.createElement('input');
    input.type = 'file';
    input.name = 'image';
    input.accept = 'image/*';
    input.setAttribute('capture', 'camera');

    input.addEventListener('change', (ev: any) => {
      console.log('changed', ev);
      console.log(ev.target.files);
      this.fileToUpload = ev.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageSrc = reader.result;
        console.log(this.imageSrc);
      }
      reader.readAsDataURL(this.fileToUpload);

      this.imageRef = this.rootRef.child(`images/${this.fileToUpload.name}`);
    }, false);

    input.click();
  }

  async submit() {
    if (this.postValue && this.beerNameValue && this.ratingValue) {
      // TODO refactor for local storage
      //fb.firestore().collection('feed').add({
      //  author: firebase.auth().currentUser.email,
      //  postText: this.postValue,
      //  title: this.beerNameValue,
      //  rating: this.ratingValue,
      //  image: this.imageRef ? this.imageRef.fullPath : null
      //});

      if (this.imageRef) {
        await this.imageRef.put(this.fileToUpload);
      }

      this.dismiss();
    } else {
      const alert = await this.alertCtrl.create({
        title: 'Cant Submit',
        message: 'You must enter a post, title and rating to submit. Would you like to discard this post?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yes',
            cssClass: 'danger',
            handler: () => {
              this.dismiss()
            }
          }
        ]
      });
      return await alert.present();
    }
  }

  async cancel() {
    const alert = await this.alertCtrl.create({
      title: 'Discard Post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {
            this.dismiss();
          }
        }
      ]
    });
    return await alert.present();
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='dark'>
            <ion-title>New Post</ion-title>

            <ion-buttons slot="end">
              <ion-button onClick={() => this.cancel()}>Cancel</ion-button>
              <ion-button onClick={() => this.submit()}>Post</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content padding class="outer-content">
          <ion-item>
            <ion-label floating>Beer Name</ion-label>
            <ion-input value={this.beerNameValue} onInput={(event) => { this.handleBeerNameValue(event) }} required></ion-input>
          </ion-item>

          <ion-item>
            <ion-label floating>New Post</ion-label>
            <ion-textarea value={this.postValue} onInput={(event) => { this.handlePostValue(event) }} required></ion-textarea>
          </ion-item>

          <h3>Rating</h3>
          <ion-item>
            <ion-range color='primary' min={0} max={5} snaps={true}></ion-range>
          </ion-item>

          <div id='modalButtonBlock'>
            <ion-button onClick={() => this.takePicture()} expand='block' color='primary'>Add Picture</ion-button>
          </div>

          {this.imageSrc ? <img src={this.imageSrc} alt='Image to upload'></img> : null}
        </ion-content>

      </ion-page>
    );
  }
}