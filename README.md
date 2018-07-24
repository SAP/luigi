# Luigi

## Overview

Luigi is a micro front-end framework written in Svelte.

### Table of contents

This is the table of contents for all `README.md` documents in the `luigi` repository:
* [Core](core/README.md)
    * [Examples](core/examples/README.md)
* [Client](client/README.md)

Read them to learn more about each project in this repository.

## Development

This mono repository uses [Lerna](https://lernajs.io/) for project management.

To start developing `core`, `client`, or `examples` projects, follow these steps:

1. Install Lerna.
```bash
npm install --global lerna
```

2. Go to the `example` application and install dependencies.
```bash
# Lerna bootstrap makes npm install and links cross-dependencies.

lerna bootstrap
```

3. Bundle cross-dependencies.
```bash
# Lerna runs the bundle script in every package where the script exists.

lerna run bundle
```

### Code formatting rules
All projects in the repository use [Prettier](https://prettier.io) to format source code. Run `npm install` in the root folder to install it along with [husky](https://github.com/typicode/husky), the Git hooks manager. Both tools ensure proper codebase formatting before committing it.
