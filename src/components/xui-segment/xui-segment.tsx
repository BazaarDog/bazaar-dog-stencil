import { Component, Element, Prop, Watch } from '@stencil/core';

enum Direction {
    Top = 'top',
    Bottom = 'bottom'
}

@Component({
    tag: 'xui-segment',
    styleUrl: 'xui-segment.scss'
})
export class XuiSegment {
    @Element() el: HTMLElement;

    @Prop() active: boolean = false;
    @Prop() attach: any;
    @Prop() dataTab: string;

    // Types
    @Prop() tab: boolean = false;

    componentDidLoad() {
        this.el.classList.add('ui', 'segment');
        this.updateActive(this.active);
        this.updateTab(this.tab);
        this.updateAttach(this.attach);
    }

    @Watch('tab')
    updateTab(value: boolean) { this.setClass('tab', value) }

    @Watch('active')
    updateActive(value: boolean) { this.setClass('active', value) }

    @Watch('attach')
    updateAttach(value) {
        this.el.classList.remove('top', 'bottom', 'attached');
        if (value === Direction.Top) { this.el.classList.add('top'); }
        if (value === Direction.Bottom) { this.el.classList.add('bottom'); }
        if (value !== undefined) { this.el.classList.add('attached'); }
    }

    setClass(name: string, value: boolean) {
        const update = value ? 'add' : 'remove';
        this.el.classList[update](name);
    }
}
