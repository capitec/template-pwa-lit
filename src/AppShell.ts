import { Router } from '@capitec/omni-router';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@capitec/omni-components/label';
import '@capitec/omni-components/hyperlink';
import '@capitec/omni-components/switch';

@customElement('app-shell')
export class AppShell extends LitElement {
    private _router: Router;
    private _darkMediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
    private _darkPreferenceChangeBound = this._darkPreferenceChange.bind(this);
    private _darkMode: boolean = this._darkMediaQuery?.matches ?? false;

    constructor() {
        super();
        this._router = Router.getInstance();

        // Register the app routes.
        this._router.addRoute({
            name: 'view-home',
            title: 'Home',
            path: '/',
            animation: 'fade',
            load: () => import(/* webpackChunkName: "module_a" */ './modules/module-a/ViewHome'),
            isDefault: true
        });

        this._router.addRoute({
            name: 'view-components',
            title: 'Components',
            path: '/components',
            animation: 'pop',
            load: () => import(/* webpackChunkName: "module_a" */ './modules/module-a/ViewComponents')
        });

        this._router.addRoute({
            name: 'view-form',
            title: 'Form',
            path: '/form',
            animation: 'slide',
            load: () => import(/* webpackChunkName: "module_b" */ './modules/module-b/ViewForm')
        });

        if (this._darkMode) {
            document.documentElement.setAttribute('dark', '');
        }
    }

    override connectedCallback(): void {
        super.connectedCallback();

        if (this._darkMediaQuery) {
            this._darkMediaQuery.addEventListener('change', this._darkPreferenceChangeBound);
        }
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();

        if (this._darkMediaQuery) {
            this._darkMediaQuery.removeEventListener('change', this._darkPreferenceChangeBound);
        }
    }

    _navigate(e: MouseEvent, path: string) {
        e.preventDefault();

        this._router.push(path);
    }

    _darkPreferenceChange(m: MediaQueryListEvent) {
        if (!this._darkMode && m.matches) {
            this._toggleDarkMode();
        } else if (this._darkMode && !m.matches) {
            this._toggleDarkMode();
        }
    }

    _toggleDarkMode() {
        this._darkMode = !this._darkMode;
        if (this._darkMode) {
            document.documentElement.setAttribute('dark', '');
        } else {
            document.documentElement.removeAttribute('dark');
        }
    }

    protected override firstUpdated() {
        // Load the route matching the current browser path.
        this._router.load();
    }

    static override styles = css`
		:host {
			width: 100%;
			height: 100%;

			display: flex;
			flex-direction: column;
			justify-content: stretch;
			align-items: stretch;
		}

		/* HEADER */

		header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;

			padding: 40px 20px;

			background: var(--global-background-color);

			transition: all .5s linear;
			cursor: pointer;
		}

		header:hover {
			background: var(--global-background-hover-color);
		}

		header > img {
			width: 150px;

			transition: all .5s linear;
		}

		header > omni-label {
			--omni-label-default-font-size: 32px;
			--omni-label-default-font-weight: bold;

			padding: 0px;
			margin: 20px 0px 0px 0px;

			transition: all .5s linear;
		}

		@media only screen and (max-width: 1000px) {
			header {
				padding: 20px;
			}

			header > img {
				width: 64px;
			}

			header > omni-label {
				--omni-label-default-font-size: 24px;
			}
		}

		@media only screen and (max-height: 700px) {
			header {
				display: none;
			}
		}

		/* NAVBAR */

		.navbar {			
			display: flex;
			justify-content: space-between;
			background: #209dee;
			align-items: center;
		}

		.navbar > omni-switch {
			padding: 10px;
			--omni-switch-label-font-color: white;/*var(--global-background-color);*/
		}

		nav {
			display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: flex-start;

			
			font-size: 16px;
			font-weight: normal;

			padding: 0px 0px;

			flex-shrink: 0;
			flex-wrap: wrap;

			transition: all .5s linear;
		}

		nav > omni-hyperlink {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			
			padding: 0px 20px;
			
			--omni-hyperlink-color: white;/*var(--global-background-color);*/
			--omni-hyperlink-color-visited: var(--omni-hyperlink-color);
			
			--omni-hyperlink-font-size: 16px;
			--omni-hyperlink-font-weight: normal;

			--omni-hyperlink-text-decorator: none;
			--omni-hyperlink-text-decorator-visited: none;

			height: 64px;

			cursor: pointer;
		}

		nav > omni-hyperlink:hover {
			--omni-hyperlink-text-decorator-hover: none;
			background: #1b86cb;
		}

		@media only screen and (max-width: 1000px) {
			nav {
				padding: 0px;
				justify-content: center;
			}

			nav > omni-hyperlink {
				height: 48px;
			}

			omni-switch > span {
				display: none;
			}
		}

		/* CONTENT AREA */
		
		omni-router {
			flex: 1 1 auto;
		}
	`;

    override render() {
        return html`
			<header @click="${(e: MouseEvent) => this._navigate(e, '/')}">
				<img src="assets/logo.png" alt="Omni Logo">
				<omni-label>Omni + Lit</omni-label>
			</header>
			<div class="navbar">
				<nav>
					<omni-hyperlink href="/" @click="${(e: MouseEvent) => this._navigate(e, '/')}">Home</omni-hyperlink>
					<omni-hyperlink href="/components" @click="${(e: MouseEvent) => this._navigate(e, '/components')}" label="Components"></omni-hyperlink>
					<omni-hyperlink href="/form" @click="${(e: MouseEvent) => this._navigate(e, '/form')}" label="Form"></omni-hyperlink>
				</nav>
				<omni-switch ?checked="${this._darkMode}" @value-change="${() => this._toggleDarkMode()}"><span>Dark Mode</span></omni-switch>
			</div>
			<omni-router></omni-router>
		`;
    }
}
