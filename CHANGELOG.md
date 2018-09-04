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

### Added
- Core: Preserve view and go back feature.
- Core: Default child nodes feature.
- Core: Add vue.js example app by [@DamianLion](https://github.com/DamianLion)
- Core: On angular example app, update angular version from version 5 to 6.
- Core: On angular example app, introduce fundamental-ui css framework.
- Core: Backdrop functionality can now be disabled via Luigi Config object.
- Core: Add error message for missing Luigi Config.
- Core: Improvements on authorization, remove login button, trigger auth flow on page load.
- Core and Client: Support for url parameters.
- Core and Client: Add documentation.

### Changed
- 'hideNav' flag to disable top and left navigations is called now "hideNavigation" and is under "settings".
- 'isHashRoute' flag to activate hash routing is moved to Luigi Config object under 'settings' and is called now 'useHashRouting'.

### Fixed
- Core: on angular example app, fix path routing issues by simplifying app chunks split.
- Core: on backdrop functionality, fix some small visual errors.
- Client: full support of es5.
- Client: Prevent reloading of whole browser window when navigating with hash routing and only hash changes.


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

[Unreleased]: https://github.com/kyma-project/luigi/compare/v0.2.1...HEAD
