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
    @state() private valid: boolean = false;
    @state() private emailValue?: string = '';
    @state() private pinValue?: number;

    static override styles: CSSResultGroup = [
        ViewBase.styles,
        css`

            :host { 
                
            }

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

    /* 
       - Introduce Form element validation.
       - Add Modal or Toast component 
       - Add validation for Email field format.
    */
    override render() {
        return html`
            <div class="preview">
                <div class="form-container">
                    <omni-label label="Input Examples" type="title"></omni-label>
                    <omni-email-field id="form-email-field" label="Email field" hint="Enter a valid email address" .value="${live(
                        this.emailValue as string
                    )}" @input="${() => this._emailFieldInput()}"></omni-email-field>
                    <omni-pin-field id="form-pin-field" label="Pin field" hint="Enter a pin consisting of numeric values" .value=${live(
                        this.pinValue as number
                    )} @input="${() => this._pinFieldInput()}"></omni-pin-field>
                    <omni-radio-group class="radio-group" label="Select your account type" horizontal>
                        <omni-radio label="Developer"></omni-radio>
                        <omni-radio label="Admin"></omni-radio>
                        <omni-radio label="Casual User" checked></omni-radio>
                    </omni-radio-group>
                    <omni-check id="form-check" label="I agree all fields above are populated" @click="${() => this._checkClicked()}"></omni-check>
                    <omni-button label="Submit" type="primary" @click="${() => this._formSubmitted()}"></omni-button>
                    <!-- Consider adding this in future
                        <<p class="terms"> Click this <omni-hyperlink label="link" inline></omni-hyperlink> to view our terms and conditions </p>>-->
                </div>
            </div>    
        `;
    }

    private _emailFieldInput() {
        const emailField = this.shadowRoot?.getElementById('form-email-field') as EmailField;
        if (emailField.error) {
            emailField.error = '';
        }
    }

    private _pinFieldInput() {
        const pinField = this.shadowRoot?.getElementById('form-pin-field') as PinField;
        if (pinField.error) {
            pinField.error = '';
        }
    }

    private _checkClicked() {
        const check = this.shadowRoot?.getElementById('form-check') as Check;
        if (check.error) {
            check.error = '';
        }
    }

    private _formSubmitted() {
        const check = this.shadowRoot?.getElementById('form-check') as Check;
        const emailField = this.shadowRoot?.getElementById('form-email-field') as EmailField;
        const pinField = this.shadowRoot?.getElementById('form-pin-field') as PinField;

        if (check.checked && emailField.value && pinField.value) {
            this.valid = true;
            /* Introduce Modal component when added to Omni-components */
            alert('Your form is valid the following profile is created');
        } else {
            this.valid = false;
            //Suggest that use regex to confirm if email address is valid
            if (!emailField.value) {
                emailField.error = 'Please enter a email value';
            }
            // Suggest that atleast a 4 digit pin is entered.
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
