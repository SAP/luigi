# Changelog

> Note: All the versions not mentioned in the changelog file do not contain changes. 

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
      "enhancement": ":rocket: Added",
      "bug": ":bug: Fixed",
      "documentation": ":memo: Documentation"
    }
    ...
  }
-->


## [v1.3.1] (2020-08-14)

#### :bug: Fixed
* [#1514](https://github.com/SAP/luigi/pull/1514) Fix a border-radius bug in nested list for 'Select Environment' popover ([@UlianaMunich](https://github.com/UlianaMunich))


## [v1.3.0] (2020-07-16)

#### :rocket: Added
* [#1496](https://github.com/SAP/luigi/pull/1496) NEW: Global search ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#1478](https://github.com/SAP/luigi/pull/1478) OIDC Support for Authorization Code flow with PKCE ([@azriel46d](https://github.com/azriel46d))

#### :bug: Fixed
* [#1477](https://github.com/SAP/luigi/pull/1477) ContextSwitcher fix selected state ([@maxmarkus](https://github.com/maxmarkus))
* [#1441](https://github.com/SAP/luigi/pull/1441) Navigation with and without params on the same node ([@ndricimrr](https://github.com/ndricimrr))

> With Luigi version v1.3.0, the new v0.10.0 of Fundamental Library Styles were included. As a result, there were breaking changes to the Luigi side navigation. You can see the updated layout [here](https://sap.github.io/fundamental-styles/components/side-navigation.html).

## [v1.2.4] (2020-07-02)

#### :bug: Fixed
* [#1453](https://github.com/SAP/luigi/pull/1453) Fix logout label ([@maxmarkus](https://github.com/maxmarkus))
* [#1431](https://github.com/SAP/luigi/pull/1431) Fix semicollapsible resize ([@maxmarkus](https://github.com/maxmarkus))

## [v1.2.3] (2020-06-26)

#### :rocket: Added
* [#1429](https://github.com/SAP/luigi/pull/1429) Added showLabel attribute to node for top level nav ([@azriel46d](https://github.com/azriel46d))
* [#1409](https://github.com/SAP/luigi/pull/1409) Added badge counter to left navigation ([@azriel46d](https://github.com/azriel46d))

#### :bug: Fixed
* [#1433](https://github.com/SAP/luigi/pull/1433) Fix double frame ([@hardl](https://github.com/hardl))
* [#1436](https://github.com/SAP/luigi/pull/1436) Remove window.parent check from Client ([@maxmarkus](https://github.com/maxmarkus))

## [v1.2.2] (2020-06-25)
* Reverted release.

## [v1.2.1] (2020-06-04)

#### :rocket: Added
* [#1316](https://github.com/SAP/luigi/pull/1316) Add onNodeChange hook ([@zarkosimic](https://github.com/zarkosimic))
* [#1326](https://github.com/SAP/luigi/pull/1326) Selected state for product switch items ([@hardl](https://github.com/hardl))
* [#1304](https://github.com/SAP/luigi/pull/1304) Add possibility to unload Luigi ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#1356](https://github.com/SAP/luigi/pull/1356) Fix client half init state ([@maxmarkus](https://github.com/maxmarkus))
* [#1374](https://github.com/SAP/luigi/pull/1374) Fix flyout title propagation ([@maxmarkus](https://github.com/maxmarkus))
* [#1367](https://github.com/SAP/luigi/pull/1367) Add testing production build capability ([@ndricimrr](https://github.com/ndricimrr))
* [#1364](https://github.com/SAP/luigi/pull/1364) Fix iframe fallback ([@maxmarkus](https://github.com/maxmarkus))
* [#1376](https://github.com/SAP/luigi/pull/1376) Fix left-nav flyout ([@zarkosimic](https://github.com/zarkosimic))
* [#1368](https://github.com/SAP/luigi/pull/1368) ContextSwitcher bugfix ([@marynaKhromova](https://github.com/marynaKhromova))
* [#1335](https://github.com/SAP/luigi/pull/1335) Fix oidc regenerator runtime issue ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#1313](https://github.com/SAP/luigi/pull/1313) Add read-only keyword labels to documentation ([@ndricimrr](https://github.com/ndricimrr))






## [v1.1.1] (2020-05-07)

#### :rocket: Added
* [#1317](https://github.com/SAP/luigi/pull/1317) Simple core development setup ([@hardl](https://github.com/hardl))

#### :bug: Fixed
* [#1318](https://github.com/SAP/luigi/pull/1318) Fix tabnav active state indication ([@hardl](https://github.com/hardl))
* [#1278](https://github.com/SAP/luigi/pull/1278) Cache improvements for dynamic nodes ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :memo: Documentation
* [#1284](https://github.com/SAP/luigi/pull/1284) Documentation for Internationalization i18n ([@maxmarkus](https://github.com/maxmarkus))
* [#1287](https://github.com/SAP/luigi/pull/1287) Link to 0.7.x documentation ([@alexandra-simeonova](https://github.com/alexandra-simeonova))


## [v1.1.0] (2020-04-24)

#### :boom: Breaking Change 
* [#1267](https://github.com/SAP/luigi/pull/1267) Following an upgrade to Fundamental Library Styles version 0.8.1, there were changes in the HTML structure. Some classes were renamed or removed completely. You can find the full list of Fundamental Library Styles changes [here](https://github.com/SAP/fundamental-styles/wiki/Breaking-Changes).  ([@marynaKhromova](https://github.com/marynaKhromova))

#### :rocket: Added
* [#1283](https://github.com/SAP/luigi/pull/1283) Translate tooltip text in semi collapsed mode and add title attributes to entries in left nav ([@zarkosimic](https://github.com/zarkosimic))
* [#1269](https://github.com/SAP/luigi/pull/1269) Oidc provider uses storage type also for oidc client configuration ([@maxmarkus](https://github.com/maxmarkus))
* [#1241](https://github.com/SAP/luigi/pull/1241) Update fundamental styles to 0.8.1 ([@UlianaMunich](https://github.com/UlianaMunich))


#### :bug: Fixed
* [#1291](https://github.com/SAP/luigi/pull/1291) Fix semicollapsible issue ([@maxmarkus](https://github.com/maxmarkus))
* [#1271](https://github.com/SAP/luigi/pull/1271) Fix leftnav nav-sync issue ([@maxmarkus](https://github.com/maxmarkus))
* [#1263](https://github.com/SAP/luigi/pull/1263) Fiddle demo page mobile view ([@UlianaMunich](https://github.com/UlianaMunich))







## [v1.0.1] (2020-04-09)

#### :rocket: Added
* [#1226](https://github.com/SAP/luigi/pull/1226) Add fromVirtualTreeRoot to linkManager ([@maxmarkus](https://github.com/maxmarkus))
* [#1222](https://github.com/SAP/luigi/pull/1222) Add fromParent to linkManager ([@ndricimrr](https://github.com/ndricimrr))
* [#1159](https://github.com/SAP/luigi/pull/1159) Getting notified of unresponsive Luigi clients ([@zarkosimic](https://github.com/zarkosimic))

#### :bug: Fixed
* [#1251](https://github.com/SAP/luigi/pull/1251) Flyout should close after click ([@marynaKhromova](https://github.com/marynaKhromova))
* [#1213](https://github.com/SAP/luigi/pull/1213) Fix OIDC storage: none ([@maxmarkus](https://github.com/maxmarkus))
* [#1220](https://github.com/SAP/luigi/pull/1220) Fix duplicate login logout buttons ([@maxmarkus](https://github.com/maxmarkus))


## [v1.0.0] (2020-03-26)

#### :rocket: Added
* [#1151](https://github.com/SAP/luigi/pull/1151) Add customSelectedOptionRenderer to style ContextSwitcher dropdown button ([@ndricimrr](https://github.com/ndricimrr))
* [#1058](https://github.com/SAP/luigi/pull/1058) Refactor authorisation to activate idp providers before Luigi is rendered ([@maxmarkus](https://github.com/maxmarkus))
* [#1055](https://github.com/SAP/luigi/pull/1055) Externalize auth providers ([@maxmarkus](https://github.com/maxmarkus))
* [#912](https://github.com/SAP/luigi/issues/912) Switch to fundamental styles ([@marynaKhromova](https://github.com/marynaKhromova))

#### :bug: Fixed
* [#1189](https://github.com/SAP/luigi/pull/1189) Modal window contrast on dark themes ([@marynaKhromova](https://github.com/marynaKhromova))
* [#1158](https://github.com/SAP/luigi/pull/1158) Aligned splitview and centered arrow ([@ndricimrr](https://github.com/ndricimrr))

#### :memo: Documentation
* [#1155](https://github.com/SAP/luigi/pull/1155) Document potential wrong-usage of context/dynamic nodes ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#1135](https://github.com/SAP/luigi/pull/1135) Add fundamental library styles section to migration docu ([@marynaKhromova](https://github.com/marynaKhromova))



## [v0.7.7] (2020-03-20)

#### :bug: Fixed
* [#1172](https://github.com/SAP/luigi/pull/1172) Fix virtualtree trailing slash ([@maxmarkus](https://github.com/maxmarkus))
* [#1179](https://github.com/SAP/luigi/pull/1179) Fix navigate ok check for withoutSync ([@maxmarkus](https://github.com/maxmarkus))
* [#1173](https://github.com/SAP/luigi/pull/1173) Recalculation after cache deletion ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#1148](https://github.com/SAP/luigi/pull/1148) deleteCache was missing in contextswitcher ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#1145](https://github.com/SAP/luigi/pull/1145) Route change loses context in contextswitcher ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :memo: Documentation
* [#1060](https://github.com/SAP/luigi/pull/1060) Luigi Videos ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#1116](https://github.com/SAP/luigi/pull/1116) Add implementations/scenarios ([@alexandra-simeonova](https://github.com/alexandra-simeonova))


## [v0.7.6] (2020-03-09)

#### :rocket: Added
* [#1075](https://github.com/SAP/luigi/pull/1075) Virtual tree navigation ([@maxmarkus](https://github.com/maxmarkus))
* [#1111](https://github.com/SAP/luigi/pull/1111) Ability to update core URL without micro frontend URL change ([@maxmarkus](https://github.com/maxmarkus))
* [#1076](https://github.com/SAP/luigi/pull/1076) Core API: Add splitview functionality ([@ndricimrr](https://github.com/ndricimrr))
* [#1129](https://github.com/SAP/luigi/pull/1129) OpenIdConnect (OIDC) provider profile interceptor ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#1119](https://github.com/SAP/luigi/pull/1119) Refactor resolved node children data management ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#1115](https://github.com/SAP/luigi/pull/1115) Profile icon tooltip text ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#1109](https://github.com/SAP/luigi/pull/1109) Document how to make use of contextUpdateListener ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#1096](https://github.com/SAP/luigi/pull/1096) Document how to set auth storage type ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#1099](https://github.com/SAP/luigi/pull/1099) Update documentation for examples + consolidate filenames ([@alexandra-simeonova](https://github.com/alexandra-simeonova))


## [v0.7.5] (2020-02-14)

#### :rocket: Added
* [#1083](https://github.com/SAP/luigi/pull/1083) Open profile items in a modal window ([@zarkosimic](https://github.com/zarkosimic))

#### :bug: Fixed
* [#1081](https://github.com/SAP/luigi/pull/1081) CustomMessages from external mf does not work ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#1068](https://github.com/SAP/luigi/pull/1068) Fix fd-modal mix-up ([@JohannesDoberer](https://github.com/JohannesDoberer))

## [v0.7.4] (2020-01-29)

#### :rocket: Added
* [#1034](https://github.com/SAP/luigi/pull/1034) Add valid href to navigation links ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#1065](https://github.com/SAP/luigi/pull/1065) Fix items calculation in more btn of tab nav ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#1047](https://github.com/SAP/luigi/pull/1047) Custom options renderer config error ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#1025](https://github.com/SAP/luigi/pull/1025) Improve API documentation ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#1024](https://github.com/SAP/luigi/pull/1024) Improve authorization doc structure ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#1000](https://github.com/SAP/luigi/pull/1000) Improve Overview page ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#965](https://github.com/SAP/luigi/pull/965) Improve application-setup.md ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#877](https://github.com/SAP/luigi/pull/877) Create content guidelines ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#1003](https://github.com/SAP/luigi/pull/1003) Documentation fixes ([@alexandra-simeonova](https://github.com/alexandra-simeonova))


## [v0.7.3] (2019-12-19)

#### :rocket: Added
* [#1002](https://github.com/SAP/luigi/pull/1002) Implicit structural nodes ([@maxmarkus](https://github.com/maxmarkus))
* [#1014](https://github.com/SAP/luigi/pull/1014) Disable context switcher drop down caret when there is only one option ([@pekura](https://github.com/pekura))
* [#1008](https://github.com/SAP/luigi/pull/1008) Custom item renderer for options in context switcher ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#993](https://github.com/SAP/luigi/pull/993) React setup ([@ndricimrr](https://github.com/ndricimrr))
* [#994](https://github.com/SAP/luigi/pull/994) Handle init in Luigi client without init handshake ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#1028](https://github.com/SAP/luigi/pull/1028) Add navigation functionality to core api ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#1017](https://github.com/SAP/luigi/pull/1017) Improve root nav caching ([@maxmarkus](https://github.com/maxmarkus))
* [#1027](https://github.com/SAP/luigi/pull/1027) Add nonce param for OAuth2 and parameters to userInfoFn ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#1023](https://github.com/SAP/luigi/pull/1023) Document anonymous access ([@maxmarkus](https://github.com/maxmarkus))


## [v0.7.2] (2019-11-29)

#### :rocket: Added
* [#970](https://github.com/SAP/luigi/pull/970) Third party cookie check ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#941](https://github.com/SAP/luigi/pull/941) Strip down angular example app ([@pekura](https://github.com/pekura))
* [#901](https://github.com/SAP/luigi/pull/901) Inactive lifecycle hook ([@maxmarkus](https://github.com/maxmarkus))
* [#923](https://github.com/SAP/luigi/pull/923) Refactor authentication ([@maxmarkus](https://github.com/maxmarkus))
* [#925](https://github.com/SAP/luigi/pull/925) Provide possibility to add alt attribute to the <img> tag ([@marynaKhromova](https://github.com/marynaKhromova))
* [#926](https://github.com/SAP/luigi/pull/926) Update vue example app ([@pekura](https://github.com/pekura))

#### :bug: Fixed
* [#992](https://github.com/SAP/luigi/pull/992) Edge browser back issue fixed ([@maxmarkus](https://github.com/maxmarkus))
* [#979](https://github.com/SAP/luigi/pull/979) Invalid initial root navigation node bug fix ([@maxmarkus](https://github.com/maxmarkus))
* [#937](https://github.com/SAP/luigi/pull/937) Example app switcher backdrop bug fix ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#982](https://github.com/SAP/luigi/pull/982) FAQ page in documentation ([@maxmarkus](https://github.com/maxmarkus))
* [#969](https://github.com/SAP/luigi/pull/969) Luigi architecture page ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#957](https://github.com/SAP/luigi/pull/957) Luigi client installation document ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#907](https://github.com/SAP/luigi/pull/907) Categories for documentation ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#847](https://github.com/SAP/luigi/pull/847) Improve navigation parameters reference ([@alexandra-simeonova](https://github.com/alexandra-simeonova))

## [v0.7.1] (2019-10-25)

#### :rocket: Added
* [#920](https://github.com/SAP/luigi/pull/920) Invalid auth provider error handling ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#931](https://github.com/SAP/luigi/pull/931) The goBack context is not delivered to preserved view ([@pekura](https://github.com/pekura))
* [#916](https://github.com/SAP/luigi/pull/916) Backdrop not covering split-view micro frontend ([@pekura](https://github.com/pekura))

## [v0.7.0] (2019-10-22)

#### :rocket: Added
* [#843](https://github.com/SAP/luigi/pull/843) Svelte 3 migration ([@pekura](https://github.com/pekura))
* [#871](https://github.com/SAP/luigi/pull/871) Tab-style navigation ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#900](https://github.com/SAP/luigi/pull/900) TabNav component refactoring ([@marynaKhromova](https://github.com/marynaKhromova))
* [#894](https://github.com/SAP/luigi/pull/894) Add hook at micro frontend container creation ([@pekura](https://github.com/pekura))

#### :rocket: Fixed
* [#917](https://github.com/SAP/luigi/pull/917) Split view container doesn't hide ([@pekura](https://github.com/pekura))

#### :memo: Documentation
* [#898](https://github.com/SAP/luigi/pull/898) Added links to getting started guide ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#869](https://github.com/SAP/luigi/pull/869) Fixed api links ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#881](https://github.com/SAP/luigi/pull/881) Add and describe "allowRules" in the general settings ([@zarkosimic](https://github.com/zarkosimic))
* [#867](https://github.com/SAP/luigi/pull/867) Improve Luigi readme ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#866](https://github.com/SAP/luigi/pull/866) Improve authorization configuration ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#836](https://github.com/SAP/luigi/pull/836) Create getting started guide ([@alexandra-simeonova](https://github.com/alexandra-simeonova))

## [v0.6.6] (2019-10-09)

#### :rocket: Fixed
* [#876](https://github.com/SAP/luigi/pull/876) nodeAccessibilityResolver sometimes not re-applied on context switch ([@pekura](https://github.com/pekura))

## [v0.6.5] (2019-10-07)

#### :rocket: Added
* [#832](https://github.com/SAP/luigi/pull/832) Set userinfo without auth, new navigation.profile.staticUserInfoFn ([@maxmarkus](https://github.com/maxmarkus))
* [#845](https://github.com/SAP/luigi/pull/845) Extend iframe with "allow" attribute ([@zarkosimic](https://github.com/zarkosimic))
* [#840](https://github.com/SAP/luigi/pull/840) Move show alert and show confirmation modal to new core api ux section ([@zarkosimic](https://github.com/zarkosimic))
* [#846](https://github.com/SAP/luigi/pull/846) default icon for left nav item when it's collapsed ([@marynaKhromova](https://github.com/marynaKhromova))
* [#830](https://github.com/SAP/luigi/pull/830) SEO optimisation ([@marynaKhromova](https://github.com/marynaKhromova))

#### :bug: Fixed
* [#834](https://github.com/SAP/luigi/pull/834) Vue app auth error ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :memo: Documentation
* [#864](https://github.com/SAP/luigi/pull/864) fixed links to Lerna ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#862](https://github.com/SAP/luigi/pull/862) Fiddle links in docs ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#857](https://github.com/SAP/luigi/pull/857) Clean up example links in docs ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#826](https://github.com/SAP/luigi/pull/826) Improve navigation-configuration.md ([@alexandra-simeonova](https://github.com/alexandra-simeonova))
* [#840](https://github.com/SAP/luigi/pull/840) Move show alert and show confirmation modal to new core api ux section ([@zarkosimic](https://github.com/zarkosimic))
* [#813](https://github.com/SAP/luigi/pull/813) Improve Luigi docs readme file ([@alexandra-simeonova](https://github.com/alexandra-simeonova))

## [v0.6.4] (2019-09-13)

#### :rocket: Added
* [#825](https://github.com/SAP/luigi/pull/825) Context switcher should (optionally) not shorten the navigation path on context change ([@pekura](https://github.com/pekura))
* [#812](https://github.com/SAP/luigi/pull/812) custom logout action in profile section ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#787](https://github.com/SAP/luigi/pull/787) luigiAfterInit lifecycle hook + app loading indicator  ([@maxmarkus](https://github.com/maxmarkus))
* [#803](https://github.com/SAP/luigi/pull/803) Title dropdown feature for switching applications ([@pekura](https://github.com/pekura))
* [#791](https://github.com/SAP/luigi/pull/791) user menu without authorization ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#821](https://github.com/SAP/luigi/pull/821) Rework backdrop for luigi-app-root bootstrap mode ([@zarkosimic](https://github.com/zarkosimic))

## [v0.6.3] (2019-09-05)

#### :rocket: Added
* [#792](https://github.com/SAP/luigi/pull/792) Avoid Luigi not configured alert ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#790](https://github.com/SAP/luigi/pull/790) Replace UI tests attributes ([@zarkosimic](https://github.com/zarkosimic))

#### :memo: Documentation
* [#794](https://github.com/SAP/luigi/pull/794) Change spelling to "micro frontend" ([@alexandra-simeonova](https://github.com/alexandra-simeonova))

## [v0.6.2] (2019-08-29)

#### :rocket: Added
* [#746](https://github.com/SAP/luigi/pull/746) Custom events for core client communication ([@maxmarkus](https://github.com/maxmarkus))
* [#756](https://github.com/SAP/luigi/pull/756) Add test attribute to navigation nodes ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#752](https://github.com/SAP/luigi/pull/752) Mechanism for partial Luigi config update ([@pekura](https://github.com/pekura))
* [#745](https://github.com/SAP/luigi/pull/745) Extend iframe sandbox rules ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#760](https://github.com/SAP/luigi/pull/760) Prevent luigi.auth.tokenIssued infinite loop ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#717](https://github.com/SAP/luigi/pull/717) Add documentation for responsive app setup ([@jesusreal](https://github.com/jesusreal))

## [v0.6.1] (2019-08-09)

#### :rocket: Added
* [#725](https://github.com/SAP/luigi/pull/725) I18n luigi internal texts and messages translatable ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#703](https://github.com/SAP/luigi/pull/703) Product Switcher documentation and configurable label and icon ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#741](https://github.com/SAP/luigi/pull/741) Dynamic node and link/external link nodes as siblings ([@pekura](https://github.com/pekura))

#### :memo: Documentation
* [#697](https://github.com/SAP/luigi/pull/697) Callback documentation for LuigiClient.addInitListener ([@maxmarkus](https://github.com/maxmarkus))
* [#703](https://github.com/SAP/luigi/pull/703) Product Switcher documentation and configurable label and icon ([@maxmarkus](https://github.com/maxmarkus))

## [v0.6.0] (2019-08-02)

#### :rocket: Added
* [#705](https://github.com/SAP/luigi/pull/705) Core api for getting translation for a specified key for given locale ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#707](https://github.com/SAP/luigi/pull/707) Add luigi bootstrap dom element option ([@jesusreal](https://github.com/jesusreal))
* [#694](https://github.com/SAP/luigi/pull/694) smooth scrolling on mobile devices ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#669](https://github.com/SAP/luigi/pull/669) product switcher header to fiori3 concept ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#678](https://github.com/SAP/luigi/pull/678) Client permissions available in the client ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#650](https://github.com/SAP/luigi/pull/650) Split View micro frontends ([@maxmarkus](https://github.com/maxmarkus))
* [#664](https://github.com/SAP/luigi/pull/664) Accumulated badge counter for mobile ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#712](https://github.com/SAP/luigi/pull/712) Fix error on click on navigation node when node is active ([@jesusreal](https://github.com/jesusreal))
* [#500](https://github.com/SAP/luigi/pull/500) Fix path routing ([@y-kkamil](https://github.com/y-kkamil))
* [#665](https://github.com/SAP/luigi/pull/665) Fix custom idp provider login function check ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#690](https://github.com/SAP/luigi/pull/690) Open split view in collapsed state ([@maxmarkus](https://github.com/maxmarkus))
* [#668](https://github.com/SAP/luigi/pull/668) Fix broken links in docu for auth providers ([@jesusreal](https://github.com/jesusreal))

## [v0.5.4] (2019-07-29)

#### :bug: Fixed
* [#708](https://github.com/SAP/luigi/issues/708) Fix error on click on navigation node when node is active ([@jesusreal](https://github.com/jesusreal))


## [v0.5.3] (2019-07-23)

#### :rocket: Added
* [#663](https://github.com/SAP/luigi/pull/663) Remove nav highlight for semiCollapsible collapsed category ([@maxmarkus](https://github.com/maxmarkus))
* [#648](https://github.com/SAP/luigi/pull/648) Generic node actions ([@jesusreal](https://github.com/jesusreal))
* [#651](https://github.com/SAP/luigi/pull/651) Post message target handling in Luigi Client ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#562](https://github.com/SAP/luigi/pull/562) Notification badge for counters ([@maxmarkus](https://github.com/maxmarkus))
* [#640](https://github.com/SAP/luigi/pull/640) Remove external link indicator for shellbar header nodes ([@marynaKhromova](https://github.com/marynaKhromova))

#### :memo: Documentation
* [#638](https://github.com/SAP/luigi/pull/638) Security dev guidelines for MF ([@JohannesDoberer](https://github.com/JohannesDoberer))

## [v0.5.2] (2019-07-12)

#### :rocket: Added
* [#639](https://github.com/SAP/luigi/pull/639) Alias function for getEventData ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#653](https://github.com/SAP/luigi/pull/653) Context switcher does not work when parentNodePath is root ([@pekura](https://github.com/pekura))
* [#647](https://github.com/SAP/luigi/pull/647) Lodash vulnerability fix ([@JohannesDoberer](https://github.com/JohannesDoberer))

## [v0.5.1] (2019-07-09)

#### :bug: Fixed
* [#632](https://github.com/SAP/luigi/pull/632) Remove side navigation footer when no footer text and no semi-collapsible navigation ([@marynaKhromova](https://github.com/marynaKhromova))

#### :memo: Documentation
* [#623](https://github.com/SAP/luigi/pull/623) Node category documentation ([@maxmarkus](https://github.com/maxmarkus))
* [#627](https://github.com/SAP/luigi/pull/627) Document view groups ([@jesusreal](https://github.com/jesusreal))

## [v0.5.0] (2019-07-04)

#### :rocket: Added
* [#626](https://github.com/SAP/luigi/pull/626) Open modal from navigation node ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#624](https://github.com/SAP/luigi/pull/624) Fiori 3 compliant left navigation collapse ([@marynaKhromova](https://github.com/marynaKhromova))
* [#610](https://github.com/SAP/luigi/pull/610) Improve default child mechanism ([@maxmarkus](https://github.com/maxmarkus))
* [#618](https://github.com/SAP/luigi/pull/618) Dropdown functionality for top right navigation nodes ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#601](https://github.com/SAP/luigi/pull/601) Add ie11 support ([@jesusreal](https://github.com/jesusreal))
* [#600](https://github.com/SAP/luigi/pull/600) View group preloading ([@pekura](https://github.com/pekura))
* [#595](https://github.com/SAP/luigi/pull/595) Add goBack support for normal navigation ([@maxmarkus](https://github.com/maxmarkus))
* [#596](https://github.com/SAP/luigi/pull/596) Add allow-modals to iframe sandbox options ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#613](https://github.com/SAP/luigi/pull/613) ContextSwitcher: Always reload if lazyLoadOption is enabled ([@maxmarkus](https://github.com/maxmarkus))
* [#608](https://github.com/SAP/luigi/pull/608) Fix core package json merge error ([@jesusreal](https://github.com/jesusreal))

#### :memo: Documentation
* [#621](https://github.com/SAP/luigi/pull/621) Update the general settings docu ([@bszwarc](https://github.com/bszwarc))
* [#602](https://github.com/SAP/luigi/pull/602) Core API docu ([@maxmarkus](https://github.com/maxmarkus))

## [v0.4.12] (2019-06-24)

#### :rocket: Added
* [#585](https://github.com/SAP/luigi/pull/585) 577 close modals by esc-key ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#545](https://github.com/SAP/luigi/pull/545) On auth expire soon event ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#569](https://github.com/SAP/luigi/pull/569) Reduce luigi client and core bundle size ([@jesusreal](https://github.com/jesusreal))
* [#552](https://github.com/SAP/luigi/pull/552) Improve control over luigi bootstrap process ([@pekura](https://github.com/pekura))
* [#544](https://github.com/SAP/luigi/pull/544) Extend luigi core api by methods for getting important dom elements ([@marynaKhromova](https://github.com/marynaKhromova))
* [#501](https://github.com/SAP/luigi/pull/501) Luigi Authentication Events ([@maxmarkus](https://github.com/maxmarkus))
* [#503](https://github.com/SAP/luigi/pull/503) Display info in bottom left corner ([@parostatkiem](https://github.com/parostatkiem))
* [#520](https://github.com/SAP/luigi/pull/520) Cache and reuse viewgroups frame ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#514](https://github.com/SAP/luigi/pull/514) display picture in topnav for idp flow ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#504](https://github.com/SAP/luigi/pull/504) Add user pic to userinfo ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#498](https://github.com/SAP/luigi/pull/498) Update unit tests dependencies for luigi core ([@jesusreal](https://github.com/jesusreal))
* [#493](https://github.com/SAP/luigi/pull/493) Make profile dropdown extensible ([@jesusreal](https://github.com/jesusreal))
* [#480](https://github.com/SAP/luigi/pull/480) Alert improvements ([@parostatkiem](https://github.com/parostatkiem))
* [#484](https://github.com/SAP/luigi/pull/484) Display userinfo ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#476](https://github.com/SAP/luigi/pull/476) remove unnecessary styles ([@marynaKhromova](https://github.com/marynaKhromova))

#### :bug: Fixed
* [#599](https://github.com/SAP/luigi/pull/599) diff vulnerability fix ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#580](https://github.com/SAP/luigi/pull/580) axios vulnerability fix ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#575](https://github.com/SAP/luigi/pull/575) Node refresh bug on hash routing ([@jesusreal](https://github.com/jesusreal))
* [#566](https://github.com/SAP/luigi/pull/566) Improve e2e testrunner script ([@maxmarkus](https://github.com/maxmarkus))
* [#561](https://github.com/SAP/luigi/pull/561) Fix e2e install ([@maxmarkus](https://github.com/maxmarkus))
* [#558](https://github.com/SAP/luigi/pull/558) Fix bug by overwriting description only when present ([@jesusreal](https://github.com/jesusreal))
* [#526](https://github.com/SAP/luigi/pull/526) Bug in left navigation ([@marynaKhromova](https://github.com/marynaKhromova))
* [#528](https://github.com/SAP/luigi/pull/528) Error message for invalid auth provider ([@maxmarkus](https://github.com/maxmarkus))
* [#530](https://github.com/SAP/luigi/pull/530) Fix dev server reload issue ([@maxmarkus](https://github.com/maxmarkus))
* [#523](https://github.com/SAP/luigi/pull/523) 485 fix headerjs error ([@maxmarkus](https://github.com/maxmarkus))
* [#482](https://github.com/SAP/luigi/pull/482) fix linter errors ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#546](https://github.com/SAP/luigi/pull/546) Modernize luigi client ([@maxmarkus](https://github.com/maxmarkus))
* [#544](https://github.com/SAP/luigi/pull/544) Extend luigi core api by methods for getting important dom elements ([@marynaKhromova](https://github.com/marynaKhromova))
* [#542](https://github.com/SAP/luigi/pull/542) Documented luigi.auth.tokenIssued event ([@maxmarkus](https://github.com/maxmarkus))
* [#531](https://github.com/SAP/luigi/pull/531) Cleanup codeowners and contributing files ([@jesusreal](https://github.com/jesusreal))

## [v0.4.11] (2019-04-12)

#### :rocket: Added
* [#468](https://github.com/SAP/luigi/pull/468) Check origin of postMessages ([@dariadomagala](https://github.com/dariadomagala))
* [#460](https://github.com/SAP/luigi/pull/460) Modal mfs e2e tests ([@parostatkiem](https://github.com/parostatkiem))
* [#451](https://github.com/SAP/luigi/pull/451) Prevent unlogged rendering ([@parostatkiem](https://github.com/parostatkiem))
* [#463](https://github.com/SAP/luigi/pull/463) Add simple collapsible navigation option ([@hardl](https://github.com/hardl))
* [#459](https://github.com/SAP/luigi/pull/459) Display labels in mobile top header menu, vertical alignment for labels ([@marynaKhromova](https://github.com/marynaKhromova))
* [#446](https://github.com/SAP/luigi/pull/446) Modal mfs ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#438](https://github.com/SAP/luigi/pull/438) Improve login error behavior ([@maxmarkus](https://github.com/maxmarkus))
* [#437](https://github.com/SAP/luigi/pull/437) Optimize luigi.css size ([@marynaKhromova](https://github.com/marynaKhromova))
* [#424](https://github.com/SAP/luigi/pull/424) Product switcher on mobile ([@parostatkiem](https://github.com/parostatkiem))
* [#435](https://github.com/SAP/luigi/pull/435) Fix alert message hidden under content window ([@y-kkamil](https://github.com/y-kkamil))
* [#425](https://github.com/SAP/luigi/pull/425) Add ts declaration file ([@y-kkamil](https://github.com/y-kkamil))
* [#423](https://github.com/SAP/luigi/pull/423) Duplicated logos and app switcher markup ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#461](https://github.com/SAP/luigi/pull/461) Prevent unescaped characters in the Alert component ([@y-kkamil](https://github.com/y-kkamil))
* [#466](https://github.com/SAP/luigi/pull/466) Deactivate Typescript Declaration file for Luigi Client ([@jesusreal](https://github.com/jesusreal))
* [#448](https://github.com/SAP/luigi/pull/448) Escape some html characters for alert component ([@y-kkamil](https://github.com/y-kkamil))
* [#429](https://github.com/SAP/luigi/pull/429) Luigi Client package should not contain src folder ([@jesusreal](https://github.com/jesusreal))
* [#427](https://github.com/SAP/luigi/pull/427) Fix transparent background in alerts ([@dariadomagala](https://github.com/dariadomagala))

#### :memo: Documentation
* [#454](https://github.com/SAP/luigi/pull/454) Documentation for modal micro frontends ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#442](https://github.com/SAP/luigi/pull/442) Remove Creative Commons license from the docs folder ([@klaudiagrz](https://github.com/klaudiagrz))
* [#419](https://github.com/SAP/luigi/pull/419) Change the codeowners file ([@mmitoraj](https://github.com/mmitoraj))


## [v0.4.10] (2019-03-08)

#### :bug: Fixed
* [#417](https://github.com/SAP/luigi/pull/417) Fix node refresh ([@hardl](https://github.com/hardl))

## [v0.4.9] (2019-03-07)

#### :bug: Fixed
* [#412](https://github.com/SAP/luigi/pull/412) Focus improvements ([@hardl](https://github.com/hardl))
* [#409](https://github.com/SAP/luigi/pull/409) Fix double-click selection issue ([@hardl](https://github.com/hardl))
* [#411](https://github.com/SAP/luigi/pull/411) Wrap alert in an invisible overlay ([@parostatkiem](https://github.com/parostatkiem))

## v0.4.8 (2019-02-20)

#### :bug: Fixed
* [#403](https://github.com/SAP/luigi/pull/403) fix generic alert bug ([@JohannesDoberer](https://github.com/JohannesDoberer))
* [#333](https://github.com/SAP/luigi/pull/333) Fix errors when building luigi angular sample application ([@kwiatekus](https://github.com/kwiatekus))

## v0.4.7 (2019-02-08)

#### :rocket: Added
* [#395](https://github.com/SAP/luigi/pull/395) Add generic alert ([@jesusreal](https://github.com/jesusreal))

#### :bug: Fixed
* [#394](https://github.com/SAP/luigi/pull/394) fix application setup issues ([@JohannesDoberer](https://github.com/JohannesDoberer))

## v0.4.6 (2019-02-07)

#### :rocket: Added
* [#390](https://github.com/SAP/luigi/pull/390) Implement test coverage feature ([@parostatkiem](https://github.com/parostatkiem))
* [#389](https://github.com/SAP/luigi/pull/389) Add generic confirmation modal ([@jesusreal](https://github.com/jesusreal))
* [#385](https://github.com/SAP/luigi/pull/385) Reload micro frontend when clicking on selected node ([@maxmarkus](https://github.com/maxmarkus))
* [#371](https://github.com/SAP/luigi/pull/371) add product switcher to navigation ([@JohannesDoberer](https://github.com/JohannesDoberer))

#### :bug: Fixed
* [#392](https://github.com/SAP/luigi/pull/392) Reload same node fails if no iframe exists ([@maxmarkus](https://github.com/maxmarkus))
* [#380](https://github.com/SAP/luigi/pull/380) Fix default child and 404 error mechanism bug ([@dariadomagala](https://github.com/dariadomagala))
## [v0.4.5] (2019-01-23)

#### :rocket: Added
* [#313](https://github.com/SAP/luigi/pull/313) Luigi config meets es6 ([@parostatkiem](https://github.com/parostatkiem))
* [#325](https://github.com/SAP/luigi/pull/325) Webpack for LuigiClient ([@parostatkiem](https://github.com/parostatkiem))
* [#321](https://github.com/SAP/luigi/pull/321) Dynamic nodes prevent navigation tree mutation ([@maxmarkus](https://github.com/maxmarkus))
* [#310](https://github.com/SAP/luigi/pull/310) Improve 404 handling ([@parostatkiem](https://github.com/parostatkiem))
* [#315](https://github.com/SAP/luigi/pull/315) Add isolate all views setting ([@dariadomagala](https://github.com/dariadomagala))
* [#339](https://github.com/SAP/luigi/pull/339) Increase oidc client loading timeout ([@kwiatekus](https://github.com/kwiatekus))

#### :bug: Fixed
* [#377](https://github.com/SAP/luigi/pull/377) Fix iframe top position ([@jesusreal](https://github.com/jesusreal))
* [#378](https://github.com/SAP/luigi/pull/378) Fix frame reload on 404 ([@dariadomagala](https://github.com/dariadomagala))
* [#368](https://github.com/SAP/luigi/pull/368) Dynamic path params not passed to children providers - fix ([@pekura](https://github.com/pekura))
* [#362](https://github.com/SAP/luigi/pull/362) Relative navigation from client does not work with dynamic nodes ([@pekura](https://github.com/pekura))
* [#349](https://github.com/SAP/luigi/pull/349) Fix preserve views node params ([@dariadomagala](https://github.com/dariadomagala))
* [#361](https://github.com/SAP/luigi/pull/361) Empty navigation category should not be shown ([@pekura](https://github.com/pekura))
* [#352](https://github.com/SAP/luigi/pull/352) Fix babel polyfill error ([@parostatkiem](https://github.com/parostatkiem))
* [#342](https://github.com/SAP/luigi/pull/342) Ignore path params in context switcher label ([@parostatkiem](https://github.com/parostatkiem))

#### :memo: Documentation
* [#365](https://github.com/SAP/luigi/pull/365) Split documentation for navigation config ([@bszwarc](https://github.com/bszwarc))
* [#343](https://github.com/SAP/luigi/pull/343) Add docs and examples for anonymous content ([@dariadomagala](https://github.com/dariadomagala))
* [#313](https://github.com/SAP/luigi/pull/313) Luigi config meets es6 ([@parostatkiem](https://github.com/parostatkiem))
* [#325](https://github.com/SAP/luigi/pull/325) Webpack for LuigiClient ([@parostatkiem](https://github.com/parostatkiem))
* [#310](https://github.com/SAP/luigi/pull/310) Improve 404 handling ([@parostatkiem](https://github.com/parostatkiem))
* [#315](https://github.com/SAP/luigi/pull/315) Add isolate all views setting ([@dariadomagala](https://github.com/dariadomagala))
* [#344](https://github.com/SAP/luigi/pull/344) Fix formatting issues and add missing info ([@bszwarc](https://github.com/bszwarc))

## [v0.4.4] (2019-01-10)

#### :rocket: Added
* [#319](https://github.com/SAP/luigi/pull/319) Implement anonymous content feature ([@hardl](https://github.com/hardl))
* [#306](https://github.com/SAP/luigi/pull/306) Icons in navigation nodes ([@parostatkiem](https://github.com/parostatkiem))

#### :bug: Fixed
* [#331](https://github.com/SAP/luigi/pull/331) Fix defaultChildNode mechanism for root path ([@jesusreal](https://github.com/jesusreal))
* [#317](https://github.com/SAP/luigi/pull/317) Improve defaultChildNode ([@parostatkiem](https://github.com/parostatkiem))

#### :memo: Documentation
* [#306](https://github.com/SAP/luigi/pull/306) Icons in navigation nodes ([@parostatkiem](https://github.com/parostatkiem))

## [v0.4.3] - 2019-01-07

#### :bug: Fixed
* [#318](https://github.com/SAP/luigi/pull/318) Increase timeout and improve error handling for loading oidc client library ([@kwiatekus](https://github.com/kwiatekus))
* [#312](https://github.com/SAP/luigi/pull/312) Fix node params for path routing ([@dariadomagala](https://github.com/dariadomagala))

## [v0.4.1] - 2018-12-27

#### :rocket: Added
* [#252](https://github.com/SAP/luigi/pull/252) Unsaved changes modal ([@parostatkiem](https://github.com/parostatkiem))
* [#288](https://github.com/SAP/luigi/pull/288) Add possibility to use pathRouting with angular-cli ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#307](https://github.com/SAP/luigi/pull/307) Fix error with parsed data ([@dariadomagala](https://github.com/dariadomagala))
* [#301](https://github.com/SAP/luigi/pull/301) Fix dropdowns behavior on click events ([@dariadomagala](https://github.com/dariadomagala))
* [#305](https://github.com/SAP/luigi/pull/305) When adding a listener via Luigi Client API, call only the listener being added ([@jesusreal](https://github.com/jesusreal))
* [#299](https://github.com/SAP/luigi/pull/299) It is not possible to have a root node with empty path segment and a view ([@pekura](https://github.com/pekura))
* [#283](https://github.com/SAP/luigi/pull/283) Default child node mechanism breaks if path ends with a slash ([@pekura](https://github.com/pekura))

#### :memo: Documentation
* [#277](https://github.com/SAP/luigi/pull/277) Improve Luigi readme files ([@bszwarc](https://github.com/bszwarc))
* [#282](https://github.com/SAP/luigi/pull/282) Add short README.md file about Luigi Core ([@bszwarc](https://github.com/bszwarc))

## [v0.4.0] - 2018-12-06

#### :rocket: Added
* [#259](https://github.com/SAP/luigi/pull/259) Nav collapsed feature ([@parostatkiem](https://github.com/parostatkiem))
* [#247](https://github.com/SAP/luigi/pull/247) Luigi view components design upgrade ([@antiheld](https://github.com/antiheld))

#### :bug: Fixed
* [#226](https://github.com/SAP/luigi/pull/226) Add check if modules are same domain ([@dariadomagala](https://github.com/dariadomagala))
* [#266](https://github.com/SAP/luigi/pull/266) Fixes for browser incompatibilities ([@pekura](https://github.com/pekura))
* [#253](https://github.com/SAP/luigi/pull/253) Allow async defaultChildNode ([@maxmarkus](https://github.com/maxmarkus))
* [#261](https://github.com/SAP/luigi/pull/261) Fix the relative path bug ([@dariadomagala](https://github.com/dariadomagala))
* [#250](https://github.com/SAP/luigi/pull/250) preserveView should allow viewUrls with query params ([@maxmarkus](https://github.com/maxmarkus))
* [#246](https://github.com/SAP/luigi/pull/246) Luigi Client creates extra entry in browser navigation history ([@pekura](https://github.com/pekura))
* [#238](https://github.com/SAP/luigi/pull/238) viewUrl should not be mandatory in dynamic node ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#262](https://github.com/SAP/luigi/pull/262) Add improvements to Luigi Client API comments and annotations ([@bszwarc](https://github.com/bszwarc))
* [#251](https://github.com/SAP/luigi/pull/251) Improvements for dex auth ([@maxmarkus](https://github.com/maxmarkus))
* [#241](https://github.com/SAP/luigi/pull/241) Include v0.3.8 in changelog ([@kwiatekus](https://github.com/kwiatekus))
* [#240](https://github.com/SAP/luigi/pull/240) Improve luigi client docu and generate new ([@jesusreal](https://github.com/jesusreal))


## [v0.3.8] - 2018-11-23

#### :rocket: Added
* [#190](https://github.com/SAP/luigi/pull/190) Context Switcher in top navigation ([@maxmarkus](https://github.com/maxmarkus))
* [#209](https://github.com/SAP/luigi/pull/209) Support navigation nodes that just link to other nodes ([@jesusreal](https://github.com/jesusreal))
* [#162](https://github.com/SAP/luigi/pull/162) 404 support for non existing paths ([@parostatkiem](https://github.com/parostatkiem))
* [#187](https://github.com/SAP/luigi/pull/187) Luigi Core config refactorings ([@jesusreal](https://github.com/jesusreal))
* [#200](https://github.com/SAP/luigi/pull/200) Align luigi header title with fundamental style ([@parostatkiem](https://github.com/parostatkiem))
* [#180](https://github.com/SAP/luigi/pull/180) Token refresh ([@y-kkamil](https://github.com/y-kkamil))
* [#160](https://github.com/SAP/luigi/pull/160) Configurable logo and title ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#235](https://github.com/SAP/luigi/pull/235) Issues with path routing ([@jesusreal](https://github.com/jesusreal))
* [#234](https://github.com/SAP/luigi/pull/234) Add logout.html to webpack config ([@kwiatekus](https://github.com/kwiatekus))
* [#232](https://github.com/SAP/luigi/pull/232) Fix no context switcher error ([@pekura](https://github.com/pekura))
* [#224](https://github.com/SAP/luigi/pull/224) Bugfix/preserve view content area ([@maxmarkus](https://github.com/maxmarkus))
* [#222](https://github.com/SAP/luigi/pull/222) Login fix ([@hardl](https://github.com/hardl))
* [#202](https://github.com/SAP/luigi/pull/202) Fix go-back-button bug ([@parostatkiem](https://github.com/parostatkiem))
* [#215](https://github.com/SAP/luigi/pull/215) mock auth logout page fix ([@y-kkamil](https://github.com/y-kkamil))
* [#211](https://github.com/SAP/luigi/pull/211) Multiple path parameters do not get replaced in view url ([@pekura](https://github.com/pekura))
* [#212](https://github.com/SAP/luigi/pull/212) Fix failing unit tests ([@dariadomagala](https://github.com/dariadomagala))
* [#206](https://github.com/SAP/luigi/pull/206) Center the logo ([@dariadomagala](https://github.com/dariadomagala))
* [#196](https://github.com/SAP/luigi/pull/196) Fix for goBack when not using micro frontend without routing ([@maxmarkus](https://github.com/maxmarkus))
* [#177](https://github.com/SAP/luigi/pull/177) Allow multiple init and update listeners ([@maxmarkus](https://github.com/maxmarkus))

#### :memo: Documentation
* [#197](https://github.com/SAP/luigi/pull/197) Improve luigi-client js docs ([@kwiatekus](https://github.com/kwiatekus))
* [#155](https://github.com/SAP/luigi/pull/155) Describe get path params and get node params better ([@pekura](https://github.com/pekura))
* [#199](https://github.com/SAP/luigi/pull/199) Add missing line and improve wording ([@bszwarc](https://github.com/bszwarc))


## [v0.3.7] - 2018-10-31


#### :rocket: Added
* [#169](https://github.com/SAP/luigi/pull/169) Enable Luigi Client (micro frontend) to check whether a path exists in the main app ([@jesusreal](https://github.com/jesusreal))

#### :bug: Fixed
* [#168](https://github.com/SAP/luigi/pull/168) Fix bug for closest parent navigation on Luigi Client ([@jesusreal](https://github.com/jesusreal))

#### :memo: Documentation
* [#138](https://github.com/SAP/luigi/pull/138) Add details about navigation nodes and reading node parameters ([@bszwarc](https://github.com/bszwarc))
* [#176](https://github.com/SAP/luigi/pull/176) Update and improve the content of the installation guide ([@bszwarc](https://github.com/bszwarc))
* [#161](https://github.com/SAP/luigi/pull/161) Fix small docu bugs ([@jesusreal](https://github.com/jesusreal))

## [v0.3.6] - 2018-10-23

#### :rocket: Added
* [#131](https://github.com/SAP/luigi/pull/131) Make automatic login configurable ([@dariadomagala](https://github.com/dariadomagala))
* [#121](https://github.com/SAP/luigi/pull/121) Navigation node as a link to an external page ([@parostatkiem](https://github.com/parostatkiem))
* [#118](https://github.com/SAP/luigi/pull/118) Keep left-side navigation on a node hierarchy level ([@maxmarkus](https://github.com/maxmarkus))
* [#129](https://github.com/SAP/luigi/pull/129) Add automatic loading indicator to show processing ([@maxmarkus](https://github.com/maxmarkus))
* [#105](https://github.com/SAP/luigi/pull/105) Enable e2e tests ([@dariadomagala](https://github.com/dariadomagala))
* [#142](https://github.com/SAP/luigi/pull/142) View preservation is now allowed also cross-domain ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#140](https://github.com/SAP/luigi/pull/140) Fix css issues in core and angular example ([@jesusreal](https://github.com/jesusreal))
* [#116](https://github.com/SAP/luigi/pull/116) Change per-component backdrop to global one ([@parostatkiem](https://github.com/parostatkiem))
* [#120](https://github.com/SAP/luigi/pull/120) Fix fonts bundling in luigi core ([@parostatkiem](https://github.com/parostatkiem))
* [#115](https://github.com/SAP/luigi/pull/115) Re-login not redirecting to luigi app ([@jesusreal](https://github.com/jesusreal))

#### :memo: Documentation
* [#148](https://github.com/SAP/luigi/pull/148) Copy template for security issues ([@franpog859](https://github.com/franpog859))
* [#135](https://github.com/SAP/luigi/pull/135) Improve getting started  documentation ([@maxmarkus](https://github.com/maxmarkus))
* [#137](https://github.com/SAP/luigi/pull/137) Add autogenerated luigi client api docs ([@jesusreal](https://github.com/jesusreal))


## [v0.3.5] - 2018-09-26

#### :rocket: Added
* [#104](https://github.com/SAP/luigi/pull/104) Dynamic pathSegments in navigation nodes ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#84](https://github.com/SAP/luigi/pull/84) Remove unnecessary files from public folder ([@dariadomagala](https://github.com/dariadomagala))
* [#103](https://github.com/SAP/luigi/pull/103) Fix behavior of the logout dropdown ([@dariadomagala](https://github.com/dariadomagala))
* [#102](https://github.com/SAP/luigi/pull/102) Fix 'preserve view' feature for sibiling nodes ([@maxmarkus](https://github.com/maxmarkus))
* [#89](https://github.com/SAP/luigi/pull/89) Fix unnecessary 'authSuccessfull' handler execution on each page refresh ([@dariadomagala](https://github.com/dariadomagala))
* [#79](https://github.com/SAP/luigi/pull/79) Fix fundamental-ui issues in applications setup docu ([@jesusreal](https://github.com/jesusreal))

#### :memo: Documentation
* [#107](https://github.com/SAP/luigi/pull/107) Commands path info in angular example readme ([@parostatkiem](https://github.com/parostatkiem))


## [core-0.3.3] - 2018-09-14

#### :rocket: Added
* [#67](https://github.com/SAP/luigi/pull/67) Navigation node visibility with custom nodeAccessibilityResolver ([@maxmarkus](https://github.com/maxmarkus))

#### :bug: Fixed
* [#82](https://github.com/SAP/luigi/pull/82) Fixed changedetector bug ([@dariadomagala](https://github.com/dariadomagala))
* [#71](https://github.com/SAP/luigi/pull/71) Fixed top navigation popover behavior ([@maxmarkus](https://github.com/maxmarkus))
* [#76](https://github.com/SAP/luigi/pull/76) Fixed broken routing after successful OIDC authentication ([@maxmarkus](https://github.com/maxmarkus))
* [#57](https://github.com/SAP/luigi/pull/57) Fixed preserve view and back example ([@dariadomagala](https://github.com/dariadomagala))
* [#75](https://github.com/SAP/luigi/pull/75) Fixed import of LuigiClient on angular app ([@jesusreal](https://github.com/jesusreal))

#### :memo: Documentation
* [#80](https://github.com/SAP/luigi/pull/80) Luigi documentation refinements ([@dpolitesap](https://github.com/dpolitesap))
* [#34](https://github.com/SAP/luigi/pull/34) Introduce changelog file ([@jesusreal](https://github.com/jesusreal))


## [client-0.3.2] - 2018-09-10

#### :rocket: Added
* [#33](https://github.com/SAP/luigi/pull/33) Ensure es5 compliance for luigi client ([@y-kkamil](https://github.com/y-kkamil))


## [core-0.3.1] - 2018-09-07

#### :bug: Fixed
* [#31](https://github.com/SAP/luigi/pull/31) Redirect from root node to first child ([@y-kkamil](https://github.com/y-kkamil))
* [#50](https://github.com/SAP/luigi/pull/50) #49 [fix] OAuth2 implicit grant flow should use GET as default reques… ([@aartek](https://github.com/aartek))


## [core-0.3.0] - 2018-09-05

#### :rocket: Added
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

#### Changed
- 'hideNav' flag to disable top and left navigations is called now "hideNavigation" and is under "settings".
- 'isHashRoute' flag to activate hash routing is moved to Luigi Config object under 'settings' and is called now 'useHashRouting'.
- Luigi Config is now under "window.Luigi.config" instead of "window.LuigiConfig" and "setConfig" and "getConfig" helper methods are available.

#### :bug: Fixed
- On angular example app, fix path routing issues by simplifying app chunks split.
- On backdrop functionality, fix some small visual errors.

## [client-0.3.0] - 2018-09-05

#### :rocket: Added
- Support for url parameters.
- Add documentation.

#### :bug: Fixed
- Prevent reloading of whole browser window when navigating with hash routing and only hash changes.

## 0.2.1 - 2018-07-24
#### :rocket: Added
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


[core-0.3.0]: https://github.com/SAP/luigi/compare/v0.2.1...core-0.3.0
[core-0.3.1]: https://github.com/SAP/luigi/compare/core-0.3.0...core-0.3.1
[core-0.3.3]: https://github.com/SAP/luigi/compare/core-0.3.2...core-0.3.3
[client-0.3.2]: https://github.com/SAP/luigi/compare/client-0.3.1...client-0.3.2
[client-0.3.0]: https://github.com/SAP/luigi/compare/v0.2.1...client-0.3.0
[v0.3.5]: https://github.com/SAP/luigi/compare/core-0.3.3...v0.3.5
[v0.3.6]: https://github.com/SAP/luigi/compare/v0.3.5...v0.3.6
[v0.3.7]: https://github.com/SAP/luigi/compare/v0.3.6...v0.3.7
[v0.3.8]: https://github.com/SAP/luigi/compare/v0.3.7...v0.3.8
[v0.4.0]: https://github.com/SAP/luigi/compare/v0.3.8...v0.4.0
[v0.4.1]: https://github.com/SAP/luigi/compare/v0.4.0...v0.4.1
[v0.4.3]: https://github.com/SAP/luigi/compare/v0.4.2...v0.4.3
[v0.4.4]: https://github.com/SAP/luigi/compare/v0.4.3...v0.4.4
[v0.4.5]: https://github.com/SAP/luigi/compare/v0.4.4...v0.4.5
[v0.4.9]: https://github.com/SAP/luigi/compare/v0.4.8...v0.4.9
[v0.4.10]: https://github.com/SAP/luigi/compare/v0.4.9...v0.4.10
[v0.4.11]: https://github.com/SAP/luigi/compare/v0.4.10...v0.4.11
[v0.4.12]: https://github.com/SAP/luigi/compare/v0.4.11...v0.4.12
[v0.5.0]: https://github.com/SAP/luigi/compare/v0.4.12...v0.5.0
[v0.5.1]: https://github.com/SAP/luigi/compare/v0.5.0...v0.5.1
[v0.5.2]: https://github.com/SAP/luigi/compare/v0.5.1...v0.5.2
[v0.5.3]: https://github.com/SAP/luigi/compare/v0.5.2...v0.5.3
[v0.5.4]: https://github.com/SAP/luigi/compare/v0.5.3...v0.5.4
[v0.6.0]: https://github.com/SAP/luigi/compare/v0.5.4...v0.6.0
[v0.6.1]: https://github.com/SAP/luigi/compare/v0.6.0...v0.6.1
[v0.6.2]: https://github.com/SAP/luigi/compare/v0.6.1...v0.6.2
[v0.6.3]: https://github.com/SAP/luigi/compare/v0.6.2...v0.6.3
[v0.6.4]: https://github.com/SAP/luigi/compare/v0.6.3...v0.6.4
[v0.6.5]: https://github.com/SAP/luigi/compare/v0.6.4...v0.6.5
[v0.6.6]: https://github.com/SAP/luigi/compare/v0.6.5...v0.6.6
[v0.7.0]: https://github.com/SAP/luigi/compare/v0.6.6...v0.7.0
[v0.7.1]: https://github.com/SAP/luigi/compare/v0.7.0...v0.7.1
[v0.7.2]: https://github.com/SAP/luigi/compare/v0.7.1...v0.7.2
[v0.7.3]: https://github.com/SAP/luigi/compare/v0.7.2...v0.7.3
[v0.7.4]: https://github.com/SAP/luigi/compare/v0.7.3...v0.7.4
[v0.7.5]: https://github.com/SAP/luigi/compare/v0.7.4...v0.7.5
[v0.7.6]: https://github.com/SAP/luigi/compare/v0.7.5...v0.7.6
[v0.7.7]: https://github.com/SAP/luigi/compare/v0.7.6...v0.7.7
[v1.0.0]: https://github.com/SAP/luigi/compare/v0.7.7...v1.0.0
[v1.0.1]: https://github.com/SAP/luigi/compare/v1.0.0...v1.0.1
[v1.1.0]: https://github.com/SAP/luigi/compare/v1.0.1...v1.1.0
[v1.1.1]: https://github.com/SAP/luigi/compare/v1.1.0...v1.1.1
[v1.2.1]: https://github.com/SAP/luigi/compare/v1.1.1...v1.2.1

[v1.2.2]: https://github.com/SAP/luigi/compare/v1.2.1...v1.2.2
[v1.2.3]: https://github.com/SAP/luigi/compare/v1.2.2...v1.2.3
[v1.2.4]: https://github.com/SAP/luigi/compare/v1.2.3...v1.2.4
[v1.3.0]: https://github.com/SAP/luigi/compare/v1.2.4...v1.3.0

[v1.3.1]: https://github.com/SAP/luigi/compare/v1.3.0...v1.3.1