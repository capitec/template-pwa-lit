# Introduction

Progressive Web App (PWA) starter template for [Lit](https://lit.dev)-based Single-page application (SPA) development, leveraging various [Omni](https://github.com/capitec?q=omni-) libraries.

# Usage

1️⃣ &nbsp; Create a new [repository from this template](https://github.com/capitec/template-pwa-lit/generate) (or fork) and clone locally:

```bash
git clone https://github.com/{your-repo-name}.git
cd {your-repo-name}
```

2️⃣ &nbsp; Restore all package dependencies:

```bash
npm i
```

3️⃣ &nbsp; Open it in VS Code:

```bash
code .
```

# Scripts
The following NPM scripts within `package.json` should be noted:

- `serve` - Launches Webpack's dev server (Automated via `F5` debugging in VS Code 😎).
- `build` - Bundles code and copies artifacts for production from the `src` directory to the `dist` directory.
- `analyze` - Bundles code (see `build` command) and generates & serves a module visual analyzer.
- `preview` - Launches a simple web server, serving the `dist` directory (Remember to `build` first! 🎗️).
- `test` - Launches the [Playwright](#run-end-to-end-tests-with-playwright) test runner & executes all tests within `tests` directory.
- `format` - Runs the Prettier formatter on all `.ts` files, applying format updates where necessary.
- `lint`- Runs the ESLint analyzer on all `.ts` files, applying code updates where necessary.

# Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run (Required)
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test

# Runs the tests only on Chromium
npm run test -- --project=chromium

# Runs the tests of a specific file
npm run test -- tests/example.spec.ts

# Runs the tests in debug mode
npm run test -- --debug
```

# Features
|     Feature    |  Availability | Description |
|-------------------------------|-----|-----------------------------------------------------------------|
|    Components                 | ✅  | [Omni Components](https://github.com/capitec/omni-components)   |
|    Component Intellisense     | ✅  |                                 |
|    Routing                    | ✅  | [Omni Router](https://github.com/capitec/omni-router)           |
|    VS Code Debugging          | ✅  | [.vscode/launch.json](./.vscode/launch.json)                              |
|    Tests                      | ✅  | [Playwright](https://playwright.dev/)              |
|    Serve                      | ✅  | [webpack](https://webpack.js.org/)                 |
|    Build                      | ✅  | [webpack](https://webpack.js.org/)                 |
|    Build chunking             | ✅  | `/* webpackChunkName: */` compiler hints           |
|    Preview built output       | ✅  | [http-server](https://github.com/http-party/http-server)                                      |
|    Formatting                 | ✅  | [Prettier](https://prettier.io/)                   |
|    Linting                    | ✅  | [ESLint](https://eslint.org/)                      |


