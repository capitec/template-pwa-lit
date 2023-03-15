import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ViewBase } from '../../common/ViewBase';
import '@capitec/omni-components/label';

@customElement('view-one')
export class ViewOne extends ViewBase {
    override render() {
        return html`
            <omni-label label="Welcome!" type="title"></omni-label>
            <omni-label label="Simple starter template that utilises Lit + Webpack, navigate around for some more examples." type="subtitle"></omni-label>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-one': ViewOne;
    }
}
