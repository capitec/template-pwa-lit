import { css, CSSResultGroup, LitElement } from 'lit';

export class ViewBase extends LitElement {
    static override styles: CSSResultGroup = css`

        /** COMMON COMPONENT HOST STYLES */
        :host {
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            align-items: center;
            background: var(--global-background-color);
            box-sizing: border-box;
            overflow: auto;
            padding: 20px;
        }

        /** INFO BLOCK STYLES */
        .info {
            background: var(--global-background-hover-color);
            justify-content: stretch;
            align-items: center;
            display: flex;
            flex-direction: column;
            margin: 24px;
            border-radius: 3px;
            padding: 0 24px;
            max-width: 600px;
        }

        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            color: var(--omni-theme-font-color);
            padding: 24px 0;
            border-bottom: 1px solid white;
            align-self: stretch;        
        }

        .item:last-of-type {
            border-bottom: unset;
        }

        .item > div {
            padding-left: 24px;
            display: flex;
            flex-direction: column;
        }
    `;
}
