# Changelog

<!-- 
Generate the changelog using the lerna-changelog tool. 
Run the following command to generate changelog content for pull requests that have been merged since the time when the last git tag was created:

./node_modules/lerna-changelog/bin/cli.js --ignoreCommiters

You can also generate changelog content corresponding to pull requests that were merged in between particular git tags:

./node_modules/lerna-changelog/bin/cli.js --ignoreCommiters --from core-0.3.0 --to core-0.3.1

The lerna-changelog tool detects changes based on PR labels and maps them to sections as per the configuration in the package.json file.
  "changelog": {
    "labels": {
      "breaking": ":boom: Breaking Change",
      "enhancement": ":rocket: Enhancement",
      "bug": ":bug: Bug Fix",
      "documentation": ":memo: Documentation"
    }
    ...
  }
-->

## [client-0.3.2] - 2018-09-10

#### :rocket: Added
* [#33](https://github.com/kyma-project/luigi/pull/33) Ensure es5 compliance for luigi client ([@y-kkamil](https://github.com/y-kkamil))


## [core-0.3.1] - 2018-09-07

#### :bug: Fixed
* [#31](https://github.com/kyma-project/luigi/pull/31) Redirect from root node to first child ([@y-kkamil](https://github.com/y-kkamil))
* [#50](https://github.com/kyma-project/luigi/pull/50) #49 [fix] OAuth2 implicit grant flow should use GET as default reques… ([@aartek](https://github.com/aartek))


## [core-0.3.0] - 2018-09-05
### Added
- Preserve view and go back feature.
- Default child nodes feature.
- Support for url parameters.
- Add vue.js example app by [@DamianLion](https://github.com/DamianLion)
- On angular example app, update angular version from version 5 to 6.
- On angular example app, introduce fundamental-ui css framework.
- Backdrop functionality can now be disabled via Luigi Config object.
- Add error message for missing Luigi Config.
- Improvements on authorization, remove login button, trigger auth flow on page load.
- Add documentation.

### Changed
- 'hideNav' flag to disable top and left navigations is called now "hideNavigation" and is under "settings".
- 'isHashRoute' flag to activate hash routing is moved to Luigi Config object under 'settings' and is called now 'useHashRouting'.
- Luigi Config is now under "window.Luigi.config" instead of "window.LuigiConfig" and "setConfig" and "getConfig" helper methods are available.

### Fixed
- On angular example app, fix path routing issues by simplifying app chunks split.
- On backdrop functionality, fix some small visual errors.

## [client-0.3.0] - 2018-09-05
### Added
- Support for url parameters.
- Add documentation.

### Fixed
- Prevent reloading of whole browser window when navigating with hash routing and only hash changes.

## 0.2.1 - 2018-07-24
### Added
- Core: Angular example application.
- Core: Hash-based and path-based routing.
- Core: Navigation setup.
- Core: Support authorization via Open ID Connect (OIDC) or OAuth2 Implicit Grant.
- Core: Navigation on top and left (can be disabled via Luigi Config object).
- Core: Backdrop functionality.
- Core: Authorization.
- Client: Lifecycle functions.
- Client: Link manager for navigation.
- Client: UX manager for backdrop.

[core-0.3.0]: https://github.com/kyma-project/luigi/compare/v0.2.1...core-0.3.0
[core-0.3.1]: https://github.com/kyma-project/luigi/compare/core-0.3.0...core-0.3.1
[client-0.3.2]: https://github.com/kyma-project/luigi/compare/client-0.3.1...client-0.3.2
[client-0.3.0]: https://github.com/kyma-project/luigi/compare/v0.2.1...client-0.3.0
