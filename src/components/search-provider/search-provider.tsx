import {Component, State, Event, EventEmitter} from '@stencil/core';
import {SearchProvider} from '../../global/interfaces';
@Component({
    tag: 'search-widget',
    styleUrl: 'search-widget.scss'
})
export class SearchWidget {

    @State() searchProviders: Array<SearchProvider>;
    @State() searchProvider: SearchProvider;
    @State() searchOptions: any[];

    @Event() backgroundToggle: EventEmitter;

    async componentDidLoad() {
        const response = await fetch('/assets/data.json');
        const data = await response.json();
        this.searchProviders = data.searchProviders;
    }

    menuToggle(e) {
        console.log('Background toggled menu', e);
        this.backgroundToggle.emit(e);
    }

    selectProvider()

    async selectProvider() {
        console.log("Select Search Provider");
        // set up with first bit of content
        try {
            this.searchProviders = null;
        }
        catch (err) {
            console.log(err);
        }
    }

    async selectOptions() {
        console.log("Search Options");
        // set up with first bit of content
        try {
            this.searchProviders = null;
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <ion-grid class="search-menu">
                <ion-row>
                        <slot/>
                </ion-row>
            </ion-grid>
        );
    }
}