# omni-starter-lit

Progressive Web App (PWA) starter template for [Lit](https://lit.dev)-based Single-page application (SPA) development, leveraging various [Omni](https://github.com/capitec?q=omni-) libraries.

### Headline Features: 😎
- TypeScript support.
- Integrated bundling, debugging, testing, linting & formatting support.
- Basic SPA boilerplate with routing.

### Key Dependencies: 🛠️
- Tooling
    - [VS Code]() for application debugging & development.
    - [Webpack]() for module bundling, including code splitting.
    - [Playwright]() for end-to-end headless browser testing.
    - [ESLint]() for static code analysis.
    - [Prettier]() for opinionated code formatting.
- Runtime
    - [Omni Components](https://github.com/capitec/omni-components) for UI elements.
    - [Omni Router](https://github.com/capitec/omni-router) for client-side routing.
    - [Lit]() for application development.

## Setup Steps

1. Fork this template repo & clone it locally.
2. Run `npm i` to restore all package dependencies.
3. Open it in VS Code (e.g. `code .`) & install recommended extensions (optional, but recommended).

## Scripts
The following provided NPM scripts contained with `package.json` should be noted:

- `serve` - Launches Webpack's dev server (Automated via `F5` debugging in VS Code).
- `build` - Bundles code for production, including all content within `src` directory.
- `preview` - Launches a simple web server on bundled output within `dist` directory, remember to `build` first!
- `test` - Launches the playwright test runner & executes all tests within `tests` directory.
- `format` - Runs the Prettier formatter on all `.ts` files, applying format updates where necessary.
- `lint`- Runs the ESLint analyzer on all `.ts` files, applying code updates where necessary.