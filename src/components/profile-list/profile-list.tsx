import { Component, Element, Prop } from '@stencil/core';

import { Profile } from '../../global/interfaces';

@Component({
  tag: 'profile-list',
  styleUrl: 'profile-list.scss'
})
export class profileList {

  @Prop() profiles: Array<Profile>;

  @Element() el: Element;

  goToDirections(address: string, dest: string) {
    this.el.closest('ion-nav').push('profile-details', { address, dest });
  }

  render() {
    if (this.profiles) {
      return (
        <ion-list>
          {this.profiles.map((profile: Profile) => {
            let color;

            if (profile.averageRating >= 4.0) {
              color = 'good';
            } else if (profile.averageRating <= 3.9 && profile.averageRating > 2.9) {
              color = 'ok'
            } else {
              color = 'bad';
            };

            return (
              <ion-item>
                <ion-avatar slot="start" class={color}>
                  <div>{profile.averageRating}</div>
                </ion-avatar>
                <ion-label>
                  <h2>{profile.name}</h2>

                  <ion-buttons>

                    <share-button listing={profile}></share-button>

                  </ion-buttons>
                </ion-label>
              </ion-item>
            )
          })}
        </ion-list>
      );
    } else {
      return (
        <ion-list>
          <div id='fake-card'></div>
        </ion-list>
      )
    }
  }
}