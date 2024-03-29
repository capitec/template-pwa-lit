import { Check } from '@capitec/omni-components/check';
import { EmailField } from '@capitec/omni-components/email-field';
import { PinField } from '@capitec/omni-components/pin-field';
import { css, CSSResultGroup, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ViewBase } from '../../common/ViewBase';
import '@capitec/omni-components/button';
import '@capitec/omni-components/check';
import '@capitec/omni-components/email-field';
import '@capitec/omni-components/icon';
import '@capitec/omni-components/label';
import '@capitec/omni-components/pin-field';
import '@capitec/omni-components/radio';
import '@capitec/omni-components/text-field';

@customElement('view-form')
export class ViewForm extends ViewBase {
    @state() private _formValid: boolean = false;
    @state() private _emailValue?: string = '';
    @state() private _pinValue?: string = '';

    static override styles: CSSResultGroup = [
        ViewBase.styles,
        css`
            .preview {
                min-height: 360px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
            }

            .form-container {
                min-height: 360px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                flex-direction: column;
                flex-flow: column wrap
            }

            .form-container > omni-email-field,
            .form-container > omni-pin-field,
            .form-container > omni-check
             {
                width: 100%;
             }

            .form-container > * {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .terms {
                margin-top: 15px;
            }

            .suffix-slot {
               margin-right: 10px;
               color: var(--omni-theme-primary-color);
            }

        `
    ];

    override render() {
        return html`
            <div class="info">
                <div class="item">
                    <omni-icon size="large">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                        </svg>
                    </omni-icon>
                    <div>
                        <omni-label label="Info" type="title"></omni-label>
                        <span>
                            This example illustrates the use of various components to produce a basic form.
                        </span>
                    </div>
                </div>
            </div>
            <div class="preview">
                <div class="form-container">
                    <omni-label label="Input Examples" type="title"></omni-label>
                    <omni-email-field 
                        id="form-email-field" 
                        label="Email" 
                        hint="Your email address" 
                        .value="${this._emailValue}" 
                        @input="${(e: InputEvent) => this._clearEmailFieldError(e)}">
                        <omni-icon size="medium" slot="suffix" class="suffix-slot">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                                <path d="M22 3.25a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H2a.75.75 0 0 1-.75-.75V4A.75.75 0 0 1 2 3.25Zm-.75 3.19-8.82 6.174a.75.75 0 0 1-.76.06l-.1-.06-8.82-6.173V19.25h18.5V6.44Zm-.202-1.69H2.951L12 11.084l9.048-6.334Z"/>
                            </svg>
                        </omni-icon>
                    </omni-email-field>
                    <omni-pin-field 
                        id="form-pin-field" 
                        label="Pin" 
                        hint="Your pin" 
                        .value=${this._pinValue} 
                        @input="${(e: InputEvent) => this._clearPinFieldError(e)}">
                    </omni-pin-field>
                    <omni-radio-group class="radio-group" label="Account Type" horizontal>
                        <omni-radio label="Developer"></omni-radio>
                        <omni-radio label="Admin"></omni-radio>
                        <omni-radio label="Casual User" checked></omni-radio>
                    </omni-radio-group>
                    <omni-check 
                        id="form-check" 
                        label="I agree all fields above are populated" 
                        @click="${(e: Event) => this._clearTermsError(e)}">
                    </omni-check>
                    <omni-button label="Submit" type="primary" @click="${() => this._submitForm()}"></omni-button>
                </div>
            </div>    
        `;
    }

    private _clearEmailFieldError(e: InputEvent) {
        const emailField = e.currentTarget as EmailField;
        emailField.error = '';
    }

    private _clearPinFieldError(e: InputEvent) {
        const pinField = e.currentTarget as PinField;
        pinField.error = '';
    }

    private _clearTermsError(e: Event) {
        const check = e.currentTarget as Check;
        check.error = '';
    }

    private _submitForm() {
        const check = this.shadowRoot?.getElementById('form-check') as Check;
        const emailField = this.shadowRoot?.getElementById('form-email-field') as EmailField;
        const pinField = this.shadowRoot?.getElementById('form-pin-field') as PinField;

        if (check.checked && emailField.value && pinField.value) {
            this._formValid = true;
            alert('Your form is valid');
        } else {
            this._formValid = false;

            if (!emailField.value) {
                emailField.error = 'Please enter an email value';
            }

            if (!pinField.value) {
                pinField.error = 'Please enter a pin value';
            }

            if (!check.checked) {
                check.error = 'Please accept the terms';
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-form': ViewForm;
    }
}
