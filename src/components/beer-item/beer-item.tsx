import { Component, Prop, Element } from '@stencil/core';
import { ToastController } from '@ionic/core';

import { saveBeer } from '../../global/save-service';

import { Beer } from '../../global/interfaces';


@Component({
  tag: 'beer-item',
  styleUrl: 'beer-item.scss'
})
export class BeerItem {

  @Prop() beer: Beer;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  @Element() el: HTMLElement;

  io: IntersectionObserver;

  componentDidLoad() {
    this.addIntersectionObserver();
  }

  addIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data: IntersectionObserverEntry[]) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        if (data[0].isIntersecting) {
          this.handleAnimation(data[0].target);
          this.removeIntersectionObserver();
        }
      }, {
        threshold: [0.3]
      })

      this.io.observe(this.el.querySelector('ion-card'));
    }
  }

  removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  handleAnimation(element: Element) {
    element.classList.add('animateIn');
  }

  async share(beer) {
    await (navigator as any).share({
      title: document.title,
      text: "Check out this cool beer",
      url: `${window.location.href}/detail/${beer.id}`
    })

    const toast = await this.toastCtrl.create({ message: 'beer shared', duration: 1000 });
    toast.present();
  }

  async save(beer: Beer) {
    saveBeer(beer);

    const toast = await this.toastCtrl.create({ message: 'beer favorited', duration: 1000 });
    toast.present();
  }

  render() {
    return (
      <ion-card>
        <st-img src={this.beer.labels ? this.beer.labels.medium : '../../images/beers.jpeg'} alt='beer' />
        <ion-card-content>
          <ion-card-title>
            {this.beer.name}
          </ion-card-title>

          <p>
            {this.beer.description ? this.beer.description : 'No description available'}
          </p>

          <ion-buttons>
            <stencil-route-link url={`/beers/detail/${this.beer.id}`}>
              <ion-button color='primary' fill='clear'>
                Detail
            </ion-button>
            </stencil-route-link>

            <ion-button onClick={() => this.save(this.beer)} fill='clear' icon-only>
              <ion-icon color='primary' name='star'></ion-icon>
            </ion-button>

            <ion-button onClick={() => this.share(this.beer)} fill='clear' icon-only>
              <ion-icon color='primary' name='share'></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-card-content>
      </ion-card>
    );
  }
}