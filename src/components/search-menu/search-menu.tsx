import {Component, Event, Prop, EventEmitter} from '@stencil/core';

@Component({
    tag: 'search-menu',
    styleUrl: 'search-menu.scss'
})
export class SearchMenu {

    @Event() leftSidebarClick: EventEmitter;
    @Prop() options: any[];

    toggleMenu() {
        this.leftSidebarClick.emit();
    }

    render() {
        return (
            <div>
                Search Options
            </div>
        );
    }
}