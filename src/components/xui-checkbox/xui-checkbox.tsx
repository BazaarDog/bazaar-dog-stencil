import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';

@Component({
    tag: 'xui-checkbox',
    styleUrl: 'xui-checkbox.scss'
})
export class Container {
    @Element() el: HTMLElement;

    @Prop() checked: boolean = false;

    TYPES = ['toggle', 'slider', 'radio'];
    @Prop() toggle: boolean = false;
    @Prop() slider: boolean = false;
    @Prop() radio: boolean = false;

    @Prop() label: string = "";

    @State() value: boolean = false;

    @Watch('checked') syncValue() { this.value = this.checked; }

    @Listen('click') doToggle() {
        this.value = !this.value || this.radio;
    }

    rootClasses() {
        const appendIfSet = (classes, typeProp) => this[typeProp] ? `${classes} ${typeProp}` : classes;
        return this.TYPES.reduce(appendIfSet, 'ui checkbox');
    }

    render() {
        return (<div class={this.rootClasses()}>
            <input type="checkbox" name="example" tabindex="0" class="hidden" checked={this.value==true}></input>
            <label>{this.label} </label>
            {this.value}
        </div>);
    }
}
