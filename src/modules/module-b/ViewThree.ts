import { Check } from '@capitec/omni-components/check';
import { EmailField } from '@capitec/omni-components/email-field';
import { PinField } from '@capitec/omni-components/pin-field';
import { css, CSSResultGroup, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { ViewBase } from '../../common/ViewBase';
import '@capitec/omni-components/button';
import '@capitec/omni-components/check';
import '@capitec/omni-components/email-field';
import '@capitec/omni-components/hyperlink';
import '@capitec/omni-components/label';
import '@capitec/omni-components/pin-field';
import '@capitec/omni-components/radio';
import '@capitec/omni-components/text-field';

@customElement('view-three')
export class ViewThree extends ViewBase {
    @state() private _formValid: boolean = false;
    @state() private _emailValue?: string = '';
    @state() private _pinValue?: number;

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

        `
    ];

    override render() {
        return html`
            <div class="preview">
                <div class="form-container">
                    <omni-label label="Input Examples" type="title"></omni-label>
                    <omni-email-field 
                        id="form-email-field" 
                        label="Email field" 
                        hint="Enter a valid email address" 
                        .value="${live(this._emailValue as string )}" 
                        @input="${(e: InputEvent) => this._emailFieldInput(e)}">
                    </omni-email-field>
                    <omni-pin-field 
                        id="form-pin-field" 
                        label="Pin field" 
                        hint="Enter a pin consisting of numeric values" 
                        .value=${live(this._pinValue as number)} 
                        @input="${(e: InputEvent) => this._pinFieldInput(e)}">
                    </omni-pin-field>
                    <omni-radio-group class="radio-group" label="Select your account type" horizontal>
                        <omni-radio label="Developer"></omni-radio>
                        <omni-radio label="Admin"></omni-radio>
                        <omni-radio label="Casual User" checked></omni-radio>
                    </omni-radio-group>
                    <omni-check id="form-check" label="I agree all fields above are populated" @click="${(e: Event) => this._checkClicked(e)}"></omni-check>
                    <omni-button label="Submit" type="primary" @click="${() => this._formSubmitted()}"></omni-button>
                </div>
            </div>    
        `;
    }

    private _emailFieldInput(e: InputEvent) {
        const emailField = e.currentTarget as EmailField;
        emailField.error = '';
    }

    private _pinFieldInput(e: InputEvent) {
        const pinField = e.currentTarget as PinField;
        pinField.error = '';
    }

    private _checkClicked(e: Event) {
        const check = e.currentTarget as Check;
        check.error = '';
    }

    private _formSubmitted() {
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
                check.error = 'Please tick the checkbox if your fields have values';
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-three': ViewThree;
    }
}
