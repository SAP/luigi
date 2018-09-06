# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). 
<!-- , -->
<!-- #and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). -->

<!-- 
Types of changes
  - 'Added' for new features.
  - 'Changed' for changes in existing functionality.
  - 'Deprecated' for soon-to-be removed features.
  - 'Removed' for now removed features.
  - 'Fixed' for any bug fixes.
  - 'Security' in case of vulnerabilities. 
-->


## [Unreleased]

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

[Unreleased]: https://github.com/kyma-project/luigi/compare/core-0.3.0...HEAD
[core-0.3.0]: https://github.com/kyma-project/luigi/compare/v0.2.1...core-0.3.0
[client-0.3.0]: https://github.com/kyma-project/luigi/compare/v0.2.1...client-0.3.0
