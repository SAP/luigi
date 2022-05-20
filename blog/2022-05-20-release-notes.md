---
title: Luigi v1.22.0
seoMetaDescription: Release notes for Luigi v1.22.0
author:
  - Aleksandra Simeonova
layout: blog
---

You can read about the new features in Luigi v1.22.0 in the release notes below.

<!-- Excerpt -->


#### Update to Fundamental Styles v0.23.0

With the new release, we updated Luigi Core to version 0.23.0 of Fundamental Styles. You can read about all changes on the [Fundamental Library Styles page](https://blogs.sap.com/2022/04/14/fundamental-library-styles-update/). You can also review the Luigi changes [here](https://github.com/SAP/luigi/pull/2698). 

#### Disable keyboard accessibility on all elements outside drawers and modals

When a drawer, modal, or confirmation modal is opened, keyboard actions outside of them are now disabled. Pressing TAB key will no longer select elements in the background that are not part of the modal/drawer. For more information, see the Luigi issues [2411](https://github.com/SAP/luigi/issues/2411) and [2690](https://github.com/SAP/luigi/issues/2690).

#### Add functionality for allow attribute to be separated by semicolons

Luigi [allowRules](https://docs.luigi-project.io/docs/general-settings/?section=allowrules) now follow the [Feature Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) convention and allow the attributes to be separated by semicolons. You can find more information [here](https://github.com/SAP/luigi/pull/2642). 

#### Bugfixes

For a full list of bugfixes in this release, see our [changelog](https://github.com/SAP/luigi/blob/master/CHANGELOG.md).