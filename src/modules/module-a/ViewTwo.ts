import { ColorField } from '@capitec/omni-components/color-field';
import { Select } from '@capitec/omni-components/select';
import { css, CSSResultGroup, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import factories from '../../assets/factories.svg';
import { ViewBase } from '../../common/ViewBase';

import '@capitec/omni-components/icon';
import '@capitec/omni-components/color-field';
import '@capitec/omni-components/select';

@customElement('view-two')
export class ViewTwo extends ViewBase {
    @state() private color: string = '#209dee';
    @state() private size: 'default' | 'extra-small' | 'small' | 'medium' | 'large' = 'large';

    private materialLink?: HTMLLinkElement;

    static override styles: CSSResultGroup = [
        ViewBase.styles,
        css`
            .preview {
                min-height: 190px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
            }

            .preview > omni-icon {
                padding: 5px;
                max-width: 58px;
                flex-wrap: wrap;
            }
        
            .controls {
                display: flex;
                flex-direction: row;
            }

            .controls > * {
                padding: 10px;
                max-width: 170px;
            }
        `
    ];

    override connectedCallback(): void {
        super.connectedCallback();

        // Adding Google Material Icons to document
        this.materialLink = document.createElement('link');
        this.materialLink.rel = 'stylesheet preload';
        this.materialLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        this.materialLink.as = 'style';
        document.head.appendChild(this.materialLink);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();

        // Removing Google Material Icons from document
        if (this.materialLink) {
            this.materialLink.remove();
        }
    }

    override render() {
        return html`
            <div class="preview" style="color: ${this.color}">
            
                <!-- Omni Icon with slotted SVG content -->
                <omni-icon size="${this.size}">
                    ${unsafeSVG(factories)}
                </omni-icon>

                <!-- Omni Icon with Google Material Icon -->
                <omni-icon size="${this.size}" icon="@material/dataset"></omni-icon>
            </div>
            <div class="controls">
                <omni-color-field label="Colour" 
                                  value="${this.color}" 
                                  @input="${(e: Event) => this._colourChange(e)}">
                </omni-color-field>
                <omni-select label="Size" 
                             value="${this.size}" 
                             .items="${iconSizes}" 
                             @change="${(e: Event) => this._sizeChange(e)}"
                ></omni-select>
            </div>            
        `;
    }

    private _colourChange(e: Event) {
        this.color = (e.target as ColorField)?.value?.toString() ?? '#209dee';
    }

    private _sizeChange(e: Event) {
        this.size = ((e.target as Select)?.value?.toString() as IconSize) ?? 'default';
    }
}

const iconSizes = ['default', 'extra-small', 'small', 'medium', 'large'] as const;
type IconSizesTuple = typeof iconSizes;
type IconSize = IconSizesTuple[number];

declare global {
    interface HTMLElementTagNameMap {
        'view-two': ViewTwo;
    }
}
