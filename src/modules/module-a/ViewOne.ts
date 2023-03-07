import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ViewBase } from '../../common/ViewBase';
import '@capitec/omni-components/label';

@customElement('view-one')
export class ViewOne extends ViewBase {
    override render() {
        return html`<omni-label label="View One"></omni-label>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-one': ViewOne;
    }
}
