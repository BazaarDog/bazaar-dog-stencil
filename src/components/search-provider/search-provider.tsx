import {Component, State, Prop, Event, EventEmitter} from '@stencil/core';
import {SearchProvider} from '../../global/interfaces-app';



@Component({
    tag: 'search-provider',
    styleUrl: 'search-provider.scss'
})
export class SearchWidget {

    @Prop() searchProviders: Array<SearchProvider>;
    @Prop() storedSearchProvider: SearchProvider;
    @State() searchOptions: any[];

    @Event() backgroundToggle: EventEmitter;
    @Event() onSearchProviderChange: EventEmitter;



    onSearchProviderChangeActivated(event) {
         if(event.detail !== this.storedSearchProvider.id){
             this.onSearchProviderChange.emit((event.detail));
         }
    }





    async componentDidLoad() {

    }

    menuToggle(e) {
        console.log('Background toggled menu', e);
        this.backgroundToggle.emit(e);
    }



    render() {
        if (this.searchProviders !==undefined) {
            return (

                        <xui-dropdown class="providerMenu"
                                      text="Search Provider"
                                      value={this.storedSearchProvider? this.storedSearchProvider.id: ''}
                                      icon={this.storedSearchProvider? this.storedSearchProvider.logo : '/assets/img/searchProviders/defaultProvider.png'}
                                      selection
                                      onInput={(event) => this.onSearchProviderChangeActivated(event)}
                        >
                            {
                                this.searchProviders.map((searchProvider) => {
                                        return (
                                            <xui-dropdown-item icon={searchProvider ? searchProvider.logo : '/assets/img/searchProviders/defaultProvider.png'}
                                                               value={searchProvider.id}
                                                               text={searchProvider.name}>
                                            </xui-dropdown-item>
                                        )
                                    }
                                )
                            }
                        </xui-dropdown>


            );
        }else{
            return(<div>
                <ion-button onClick={(event) => this.onSearchProviderChangeActivated(event)}>
                    No Search Providers Loaded
                </ion-button>

            </div>)
        }

    }
}