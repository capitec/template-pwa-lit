import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ViewBase } from '../../common/ViewBase';
import '@capitec/omni-components/label';

@customElement('view-three')
export class ViewThree extends ViewBase {

    override render() {
        return html`<omni-label label="View Three"></omni-label>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-three': ViewThree;
    }
}
