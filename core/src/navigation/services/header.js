import { StateHelpers, GenericHelpers } from '../../utilities/helpers';
import { LuigiConfig, LuigiI18N, LuigiUX } from './../../core-api';
import { get } from 'lodash';

export const processHeaderSettings = (component) => {
  StateHelpers.doOnStoreChange(
    component.store,
    () => {
      const appSwitcher = LuigiConfig.getConfigValue('navigation.appSwitcher');
      if (appSwitcher) {
        component.set({ appSwitcherItems: appSwitcher.items });
        component.set({ showMainAppEntry: appSwitcher.showMainAppEntry });
        component.set({ itemRenderer: appSwitcher.itemRenderer });
        if (GenericHelpers.requestExperimentalFeature('btpToolLayout')) {
          component.set({ keepMainTitle: appSwitcher.keepMainTitle });
          component.set({ showSubTitle: appSwitcher.showSubTitle !== false });
        }
      }
      component.set({
        hasApps:
          component.get().showMainAppEntry ||
          (component.get().appSwitcherItems && component.get().appSwitcherItems.length > 0)
      });
      return LuigiConfig.getConfigValueAsync('settings.header').then((header) => {
        if (header) {
          component.set({ defaultTitle: header.title || '' });
          component.set({ defaultSubTitle: header.subTitle || '' });
        }
        updateTitle(component);

        if (!header) {
          return;
        }

        const hasLogo = Boolean(header.logo);
        component.set({ hasLogo });
        setTimeout(() => {
          if (hasLogo && component.get().logo) {
            component.get().logo.src = header.logo;

            if (header.altText) {
              component.get().logo.alt = header.altText;
            }
          }
        });

        // Set Favicon
        if (header.favicon) {
          const link = Object.assign(document.createElement('link'), {
            type: 'image/x-icon',
            rel: 'shortcut icon',
            href: header.favicon
          });
          const head = document.getElementsByTagName('head')[0];

          for (const child of head.childNodes) {
            if (child.rel === 'shortcut icon') {
              child.remove();
            }
          }
          head.appendChild(link);
        }
      });
    },
    ['settings.header']
  );
};

const segmentMatches = (linkSegment, pathSegment, pathParams) => {
  if (linkSegment === pathSegment) {
    return true;
  }
  if (pathSegment.startsWith(':') && pathParams && pathParams[pathSegment.substr(1)] === linkSegment) {
    return true;
  }
  return false;
};

const checkMatch = (route, pathData, pathParams) => {
  let match = true;
  GenericHelpers.trimTrailingSlash(GenericHelpers.trimLeadingSlash(route))
    .split('/')
    .forEach((pathSegment, index) => {
      if (match) {
        if (index + 1 >= pathData.length) {
          match = false;
        } else if (
          !pathData[index + 1].pathSegment ||
          !segmentMatches(pathSegment, pathData[index + 1].pathSegment, pathParams)
        ) {
          match = false;
        }
      }
    });
  return match;
};

export const updateTitle = (component) => {
  const appSwitcherItems = component.get().appSwitcherItems;
  const pathData = component.get().pathData;
  const pathParams = component.get().pathParams;
  let selectedItem;
  if (appSwitcherItems && pathData) {
    [...appSwitcherItems]
      .sort((el1, el2) => (el2.link || '').localeCompare(el1.link || ''))
      .some((item) => {
        let match = checkMatch(item.link, pathData, pathParams);

        if (!match && item.selectionConditions?.route) {
          match = checkMatch(item.selectionConditions.route, pathData, pathParams);
          if (match) {
            (item.selectionConditions.contextCriteria || []).forEach((ccrit) => {
              match = match && get(pathData._context, ccrit.key) === ccrit.value;
            });
          }
        }

        if (match) {
          selectedItem = item;
        }
        return match;
      });
  }
  component.set({ selectedItem });
  const title = selectedItem && selectedItem.title ? selectedItem.title : component.get().defaultTitle;
  const documentTitle = LuigiUX.getDocumentTitle() || title;
  component.set({ title });
  document.title = LuigiI18N.getTranslation(documentTitle);
  const subTitle = selectedItem ? selectedItem.subTitle || '' : component.get().defaultSubTitle;
  component.set({ subTitle });
};
