import { Component, Listen, Prop, State } from '@stencil/core';
import { ModalController } from '@ionic/core';

import { checkAnon } from '../../global/utils';

declare var localforage: any;

@Component({
  tag: 'feed-page',
  styleUrl: 'feed-page.scss'
})
export class FeedPage {

  @State() posts: any = [];

  @Prop({ connect: 'ion-modal-controller' }) modalCtrl: ModalController;

  componentDidLoad() {
    this.getPosts();
  }

  async getPosts() {
    const tempPosts = [];

    localforage.setItem('key', 'value').then(function () {
      return localforage.getItem('key');
    }).then(function (value) {
      value.forEach((doc) => {
        tempPosts.push(doc.data());
      });
      console.log(tempPosts);
      this.posts = tempPosts;
    }).catch(function (err) {
      console.error(err);
      // we got an error
    });
  }

  @Listen('body:ionModalDidDismiss')
  update() {
    this.getPosts();
  }

  async makeNewPost() {
    const modal = await this.modalCtrl.create({
      component: 'feed-page-modal'
    });
    await modal.present();
  }

  render() {
    return (
      <ion-page>

        <profile-header>
        </profile-header>

        <ion-content>
          <feed-list posts={this.posts}></feed-list>
        </ion-content>


        {checkAnon() ? null : <ion-fab vertical='bottom' horizontal='right'>
          <ion-fab-button onClick={() => this.makeNewPost()}>
            <ion-icon name='add'></ion-icon>
          </ion-fab-button>
        </ion-fab>}
      </ion-page>
    );
  }
}