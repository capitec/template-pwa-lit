import { Router } from '@capitec/omni-router';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@capitec/omni-components/label';
import '@capitec/omni-components/hyperlink';
import '@capitec/omni-components/switch';

@customElement('app-shell')
export class AppShell extends LitElement {
    private _router: Router;
    private darkMediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : undefined;
    private _darkPreferenceChangeBound = this._darkPreferenceChange.bind(this);

    private darkMode: boolean = this.darkMediaQuery?.matches ?? false;

    constructor() {
        super();
        this._router = Router.getInstance();

        // Register the app routes.
        this._router.addRoute({
            name: 'view-one',
            title: 'One',
            path: '/one',
            animation: 'fade',
            load: () => import('./modules/module-a/ViewOne'),
            isDefault: true
        });

        this._router.addRoute({
            name: 'view-two',
            title: 'Two',
            path: '/two',
            animation: 'pop',
            load: () => import('./modules/module-a/ViewTwo')
        });

        this._router.addRoute({
            name: 'view-three',
            title: 'Three',
            path: '/three',
            animation: 'slide',
            load: () => import('./modules/module-b/ViewThree')
        });

        if (this.darkMode) {
            document.documentElement.setAttribute('dark', '');
        }
    }

    override connectedCallback(): void {
        super.connectedCallback();

        if (this.darkMediaQuery) {
            this.darkMediaQuery.addEventListener('change', this._darkPreferenceChangeBound);
        }
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();

        if (this.darkMediaQuery) {
            this.darkMediaQuery.removeEventListener('change', this._darkPreferenceChangeBound);
        }
    }

    _navigate(e: MouseEvent, path: string) {
        e.preventDefault();

        this._router.push(path);
    }

    _darkPreferenceChange(m: MediaQueryListEvent) {
        if (!this.darkMode && m.matches) {
            this._toggleDarkMode();
        } else if (this.darkMode && !m.matches) {
            this._toggleDarkMode();
        }
    }

    _toggleDarkMode() {
        this.darkMode = !this.darkMode;
        if (this.darkMode) {
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

		/* Header */

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

		/* Nav Bar */

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

			padding: 0px 20px;

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
		}

		/* Content Area */

		omni-router {
			flex: 1 1 auto;
		}
	`;

    override render() {
        return html`
			<header @click="${(e: MouseEvent) => this._navigate(e, '/')}">
				<img src="assets/logo.png" alt="Omni Logo">
				<omni-label>Omni Starter Lit</omni-label>
			</header>
			<div class="navbar">
				<nav>
					<omni-hyperlink href="/one" 	@click="${(e: MouseEvent) => this._navigate(e, '/one')}">One</omni-hyperlink>
					<omni-hyperlink href="/two" 	@click="${(e: MouseEvent) => this._navigate(e, '/two')}" label="Two"></omni-hyperlink>
					<omni-hyperlink href="/three" 	@click="${(e: MouseEvent) => this._navigate(e, '/three')}" label="Three"></omni-hyperlink>
				</nav>
				<omni-switch label="Dark Mode" ?checked="${this.darkMode}" @value-change="${() => this._toggleDarkMode()}"></omni-switch>
			</div>
			<omni-router></omni-router>
		`;
    }
}
