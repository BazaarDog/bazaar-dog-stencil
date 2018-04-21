import {Component, Method, Prop, Event, State, EventEmitter} from '@stencil/core';
import {SearchOptionInterface} from '../../global/interfaces-app';

@Component({
    tag: 'search-option',
    styleUrl: 'search-option.scss'
})
export class SearchOption {

    @Prop() param: string;
    @Prop() option: SearchOptionInterface;
    @Prop() init: any;
    @State() selectedValue: any;
    @Event() onSearchParamChange: EventEmitter<{ param: string; value: any }>;

    async componentDidLoad() {
        this.selectedValue = this.init;
    }

    setOptions(opt) {
        Object.keys(opt).map((key) => {
                const checked = opt[key].options.filter(function (el) {
                    return el.checked == true;
                });
                if (checked.length > 0) {
                    this.param[key] = checked[0].value;
                } else {
                    const d = opt[key].options.filter(function (el) {
                        return el.default == true;
                    });
                    if (d.length > 0) {
                        this.param[key] = d[0].value;
                    } else {
                        this.param[key] = null;
                    }
                }
            }
        );

    }

    @Method()
    onSearchParamRadioActivated(event) {
        this.selectedValue = event.target.value;
        console.log("Radio Change Activated");
        console.log(JSON.stringify(event.target.value));
        this.onSearchParamChange.emit({
            'param' : this.param,
            'value' : this.selectedValue
        });
    }

    @Method()
    onSearchParamCheckboxActivated(event) {
        console.log("Checkbox Change Activated");
        console.log(JSON.stringify(event.target.checked));
        this.selectedValue = event.target.checked;
        this.onSearchParamChange.emit({
            'param' : this.param,
            'value' : this.selectedValue
        });
    }

    @Method()
    onSearchParamDropdownActivated(event) {
        console.log("Dropdown Change Activated");
        console.log(JSON.stringify(event.target.value));
        if((this.selectedValue !== event.target.value) && (event.target.value !== undefined)){
            this.selectedValue = event.target.value;
            this.onSearchParamChange.emit({
                'param' : this.param,
                'value' : this.selectedValue
            });
        }

    }

    render() {
        if (this.option.type == 'radio') {
            return (
                this.option.options.map((item) => {
                        return (
                            <ion-item>
                               <ion-radio onClick={(ev) => this.onSearchParamRadioActivated(ev)}
                                       name={this.option.label}
                                       value={item.value}
                                       checked={item.value===this.selectedValue}
                                />
                                <ion-label >{item.label}</ion-label>
                            </ion-item>
                        )
                    }
                )
            )
        } else if (this.option.type == 'checkbox') {
            return (
                this.option.options.map((item) => {
                        return (
                            <ion-item>
                                <ion-label>
                                    {item.label}
                                </ion-label>
                                <ion-buttons>
                                    <ion-toggle onClick={(event) => this.onSearchParamCheckboxActivated(event)}
                                                checked={this.selectedValue}></ion-toggle>
                                </ion-buttons>
                            </ion-item>

                        )
                    }
                )
            )
        }  else if (this.option.type == 'dropdown') {
                        return (
                        [<xui-dropdown
                            value={this.selectedValue}
                                onClick={(event) => this.onSearchParamDropdownActivated(event)}
                            selection>
                        {
                            this.option.options.map((item) => {
                                    return (
                                        <xui-dropdown-item value={item.value}  text={item.label}>
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
                    <div id='fake-card'>Did parse Search Option</div>
                </ion-list>
            )
        }
    }


}