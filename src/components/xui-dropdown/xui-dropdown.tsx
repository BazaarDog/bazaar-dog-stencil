import { Component, Element, Prop, Watch, State, Listen, Event, EventEmitter } from '@stencil/core';

const ITEM_NAME = 'XUI-DROPDOWN-ITEM';

interface Item {
    active: boolean,
    value: any,
    text: string
}

@Component({
    tag: 'xui-dropdown',
    styleUrl: 'xui-dropdown.scss'
})
export class Dropdown {
    @Element() el;

    @State() active: boolean = false;
    @State() clickInProgress: boolean = false;
    @State() selected: Item;

    @Prop() name: string = 'dropdown-input';
    @Prop() text: string;
    @Prop() icon: string;
    @Prop() value: any;

    // Behaviors
    @Prop() openOnFocus: boolean = true;

    // Variants
    @Prop() selection: boolean = false;


    // Events
    @Event() input: EventEmitter;

    @Listen('keydown.enter') onKeyEnter() { this.deactivate(); }
    @Listen('keydown.up') onKeyUp() { this.shiftSelected(-1); }
    @Listen('keydown.down') onKeyDown() { this.activate(); this.shiftSelected(1); }
    @Listen('keydown.escape') onKeyEscape() { this.deactivate(); }
    @Listen('focus') onFocus(_ev) {
        if (this.openOnFocus && !this.clickInProgress) { this.activate(); }
    }
    @Listen('blur') onBlur(ev) {
        if (isEventFrom(ev, this.el)) { return; }
        this.deactivate();
    }
    @Listen('mousedown') onMouseDown(_ev) { this.clickInProgress = true; }
    @Listen('mouseup') onMouseUp(ev) {
        this.clickInProgress = false;
        if (ev.target.nodeName === ITEM_NAME) { this.select(ev.target); }
        this.toggle();
    }

    @Watch('value') onValueChange() { this.update(); }

    // Actions
    activate() { this.active = true; }
    deactivate() { this.active = false; }
    toggle() { this.active = !this.active; }
    select(item: Item) {
        if (this.selected) { this.selected.active = false; }
        this.selected = item;
        item.active = true;
        this.input.emit(item.value);
    }
    update() {
        if (this.value) {
            const selected = this.itemNodes().find(item => item.value === this.value);
            if (selected) { this.select(selected); }
        }
    }

    // Getters
    selectedIndex() {
        return this.selected ? this.itemNodes().findIndex(node => node.value === this.selected.value) : -1;
    }
    itemNodes() {
        const menuNode = this.el.querySelector('.menu');
        const isDropdownItem = node => node.nodeName === ITEM_NAME;
        return Array.prototype.filter.call(menuNode.childNodes, isDropdownItem);
    }
    shiftSelected(delta) {
        const index = this.selectedIndex() + delta;
        const newSelected = this.itemNodes()[index];
        if (newSelected) { this.select(newSelected); }
    }

    componentDidLoad() {
        this.el.tabIndex = this.el.tabIndex > -1 ? this.el.tabIndex : 0;
        this.update();
    }

    render() {
        const classes = {
            ui: true,
            dropdown: true,
            selection: this.selection,
            visible: this.active,
            active: this.active
        };
        const labelClasses = { text: true, default: !this.selected };
        const menuClasses = {
            menu: true,
            transition: true,
            visible: this.active,
            hidden: !this.active
        };
        const text = this.selected ? this.selected.text : this.text;
        if(this.icon!=null){
            return <div class={classes}>
                <i class={`large  middle aligned icon`}><img src={this.icon}/></i>
                <label class={labelClasses}>{text}</label>
                <input type="hidden" name={this.name}></input>
                <div class={menuClasses} tabindex="-1">
                    <slot></slot>
                </div>
            </div>;
        }else{
            return <div class={classes}>
                <label class={labelClasses}>{text}</label>
                <input type="hidden" name={this.name}></input>
                <div class={menuClasses} tabindex="-1">
                    <slot></slot>
                </div>
            </div>;
        }
    }
}

function isEventFrom(event, element) {
    const hasChild = (parent, child, maxDistance = 2) => {
        if (!child || !child.parentElement || maxDistance === 0) { return false };
        if (child.parentElement === parent) { return true; }
        return hasChild(parent, child.parentElement, maxDistance - 1);
    };
    return hasChild(element, event.relatedTarget);
}
