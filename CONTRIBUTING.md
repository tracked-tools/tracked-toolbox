# How To Contribute

This repo is divided into multiple packages using Yarn workspaces:

- `tracked-toolbox` is the actual `tracked-toolbox` addon
- `test-app` contains `tracked-toolbox` test suite

## Installation

- `git clone https://github.com/tracked-tools/tracked-toolbox.git`
- `cd tracked-toolbox`
- `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Building the addon

- `cd tracked-toolbox`
- `pnpm build`

## Running tests

- `cd test-app`
- `pnpm test` – Runs the test suite on the current Ember version
- `pnpm test:watch` – Runs the test suite in "watch mode"

## Running the test application

- `cd test-app`
- `pnpm start`
- Visit the test application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
