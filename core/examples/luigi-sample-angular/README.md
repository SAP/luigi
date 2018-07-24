# Sample luigi sample application written in Angular

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
* Using Angular CLI (standard): `npm run start`

> If you want to enable path routing instead of hash, run the app without Angular CLI.

* Without Angular CLI: `npm run startWebpack`


## Use OpenID Connect

For running OpenID Connect (OIDC) locally, for example with DEX, follow these steps:

1. Run your app locally
2. Add `127.0.0.1 your.address` to `/etc/hosts` 
3. Set __LuigiConfig.auth.use__ to `openIdConnect`
4. Run using `npm run start -- --host your.address`
5. Open [your.address:4200](http://your.address:4200)
