import { Component, Element, Prop, Watch } from '@stencil/core';

@Component({
    tag: 'xui-dropdown-item'
})
export class DropdownItem {
    @Element() el;

    @Prop() icon: string;
    @Prop() text: string;
    @Prop() value: any;
    @Prop() active: boolean = false;

    componentDidLoad() {
        this.el.classList.add('item');
        this.updateActive(this.active);
    }

    @Watch('active')
    updateActive(_active: boolean) {
        const update = this.active ? 'add' : 'remove';
        this.el.classList[update]('active');
        this.el.classList[update]('selected');
    }

    render() {
        //return ([<slot/>, this.text]);
        if(this.icon!==undefined){
            return[
                <i class={`large  middle aligned icon`}><img src={this.icon}/></i>,
                this.text
            ]
        }else{
            return[
                this.text
            ]
        }
    }
}
