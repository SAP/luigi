# Changelog

<!-- , -->
<!-- #and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). -->

<!-- 
Generate changelog using lerna-changelog tool.


Types of changes are detected based on PR labels and are mapped to sections as per configuration in the package.json
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


## [Unreleased]

## [core-0.3.1] - 2018-09-07

#### :bug: Bug Fix
* [#31](https://github.com/kyma-project/luigi/pull/31) Redirect from root node to first child ([@y-kkamil](https://github.com/y-kkamil))
* [#50](https://github.com/kyma-project/luigi/pull/50) #49 [fix] OAuth2 implicit grant flow should use GET as default reques… ([@aartek](https://github.com/aartek))

#### Committers: 4
- Artur ([@aartek](https://github.com/aartek))
- Markus ([@maxmarkus](https://github.com/maxmarkus))
- [@kwiatekus](https://github.com/kwiatekus)
- [@y-kkamil](https://github.com/y-kkamil)

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

[Unreleased]: https://github.com/kyma-project/luigi/compare/core-0.3.1...HEAD
[core-0.3.0]: https://github.com/kyma-project/luigi/compare/v0.2.1...core-0.3.0
[core-0.3.1]: https://github.com/kyma-project/luigi/compare/core-0.3.0...core-0.3.1
[client-0.3.0]: https://github.com/kyma-project/luigi/compare/v0.2.1...client-0.3.0
