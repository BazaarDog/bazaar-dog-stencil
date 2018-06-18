import {Component, Method, Prop, Event, State, EventEmitter} from '@stencil/core';
import {Map, SortByItems} from '../../global/interfaces-app';

@Component({
    tag: 'sort-by-dropdown',
    styleUrl: 'sort-by-dropdown.scss'
})
export class SortByDropdown {

    @Prop() param: string;
    @Prop() options: Map<SortByItems>;
    @Prop() init: any;
    @State() selectedValue: any;
    @Event() onSearchParamChange: EventEmitter<{ param: string; value: any }>;

    async componentDidLoad() {
        this.selectedValue = this.init;
    }

    setOptions(opt) {
        Object.keys(opt).map((key) => {
                const d = opt[key].options.filter(function (el) {
                    return el.default == true;
                });
                if (d.length > 0) {
                    this.param[key] = d[0].value;
                } else {
                    this.param[key] = null;
                }
            }
        );

    }


    @Method()
    onSortByActivated(event) {
        console.log("Dropdown Change Activated");

        if ((this.selectedValue !== event.target.value) && (event.target.value !== undefined)) {
            this.selectedValue = event.target.value;
            console.log(JSON.stringify(event.target.value));
            this.onSearchParamChange.emit({
                'param': 'sortBy',
                'value': this.selectedValue
            });
        }

    }

    render() {
        if (this.options !== undefined) {
            return (
                [<xui-dropdown
                    value={this.selectedValue}
                    onClick={(event) => this.onSortByActivated(event)}
                    selection>
                    {
                        Object.keys(this.options).map((key) => {
                                return (
                                    <xui-dropdown-item value={key} text={this.options[key].label}>
                                    </xui-dropdown-item>
                                )
                            }
                        )
                    }
                </xui-dropdown>,
                    <br/>,
                    <br/>]
            )
        }
        else {
            return (

                <ion-list>
                    <div id='fake-card'>Sorting options are not loaded</div>
                </ion-list>
            )
        }
    }


}