import { Component, Element, State } from '@stencil/core';
// import { RouterHistory } from '@stencil/router';


@Component({
  tag: 'main-page',
  styleUrl: 'main-page.scss'
})
export class MainPage {

  @State() firstImageUrl: string = '/assets/img/defaultItem.png';
  @State() secondImageUrl: string = '/assets/img/defaultAvatar.png';

  // @Prop() history: RouterHistory;

  @Element() el: Element;

  navigateToListing() {
    // this.history.push('/beers', {});
    this.el.closest('ion-nav').push('tabs-page');
  }

  navigateToProfiles() {
    // this.history.push('/bars', {});
    this.el.closest('ion-nav').push('profile-page');
  }

  render() {
    return (
      <ion-page class='show-page'>
        <profile-header></profile-header>

        <ion-content>
          <main>
            <div onClick={() => this.navigateToListing()}>
              <div id='first-card' class='card'>
                <img class='cardImage' src={this.firstImageUrl} alt='listing' />
                <div class="card-title">Listings</div>
                <div class="card-subtitle">for you!</div>
              </div>
            </div>

            <div onClick={() => this.navigateToProfiles()}>
              <div class='card'>
                <img class='cardImage' src={this.secondImageUrl} alt='Peers' />
                <div class="card-title">Peers</div>
                <div class="card-subtitle">Connected peers</div>
              </div>
            </div>
          </main>
        </ion-content>
      </ion-page>
    );
  }
}