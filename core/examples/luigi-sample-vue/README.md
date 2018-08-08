# Sample luigi application written in Vue.JS

## Development

This mono repository uses [Lerna](https://lernajs.io/) for project management. Ensure that you have installed lerna, if not then run   
`npm install --global lerna`

To start developing this application, follow these steps:

1. Install dependencies.  
`lerna bootstrap` executes npm install and links cross-dependencies
```bash
lerna bootstrap
```

2. Bundle cross-dependencies.  
`lerna run` runs the given script in every package referenced in lerna.json
```bash
lerna run bundle
```

## Run server

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

## Use OpenID Connect

currently only available in the angular sample
