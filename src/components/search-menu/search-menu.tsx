import {Component, Event, Prop, EventEmitter} from '@stencil/core';
import {Map} from '../../global/interfaces';
import {SearchOptionInterface} from '../../global/interfaces-app';
@Component({
    tag: 'search-menu',
    styleUrl: 'search-menu.scss'
})
export class SearchMenu {

    @Event() leftSidebarClick: EventEmitter;
    @Prop() options: Map<SearchOptionInterface>;

    toggleMenu() {
        this.leftSidebarClick.emit();
    }

    getInit(options) {

        const checked = options.filter(function (el) {
            return el.checked == true;
        });
        if (checked.length > 0) {
            return checked[0].value;
        } else {
            const d = options.filter(function (el) {
                return el.default == true;
            });
            if (d.length > 0) {
                return d[0].value;
            } else {
                return "";
            }
        }
    }





render()
{
    if (this.options) {
        return (
            Object.keys(this.options).map((key) => {
                    return (
                        <ion-card>
                            <ion-card-header>
                                <label ><strong>{this.options[key].label}</strong></label>
                            </ion-card-header>
                            <ion-card-content>
                                <search-option param={key} option={this.options[key]} init={this.getInit(this.options[key].options)}/>
                            </ion-card-content>
                        </ion-card>
                    )
                }
            )
        )
    } else {
        return (
            <ion-list>
                <div id='fake-card'>No Search Options</div>
            </ion-list>
        )
    }
}
}