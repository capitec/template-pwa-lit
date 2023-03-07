import { css, CSSResultGroup, LitElement } from 'lit';

export class ViewBase extends LitElement {
    static override styles: CSSResultGroup = css`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: var(--global-background-color);
        }
    `;
}
