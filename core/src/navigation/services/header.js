import { StateHelpers, GenericHelpers } from '../../utilities/helpers';
import { LuigiConfig, LuigiI18N } from './../../core-api';

export const processHeaderSettings = component => {
  StateHelpers.doOnStoreChange(
    component.store,
    () => {
      const appSwitcher = LuigiConfig.getConfigValue('navigation.appSwitcher');
      if (appSwitcher) {
        component.set({ appSwitcherItems: appSwitcher.items });
      }
      component.set({
        hasApps:
          component.get().appSwitcherItems &&
          component.get().appSwitcherItems.length > 0
      });
      return LuigiConfig.getConfigValueAsync('settings.header').then(header => {
        if (!header) {
          return;
        }
        // Set Title and Logo
        if (header.title) {
          component.set({ defaultTitle: header.title });
          updateTitle(component);
        }

        const hasLogo = Boolean(header.logo);
        component.set({ hasLogo });
        if (hasLogo && component.refs && component.refs.logo) {
          component.refs.logo.src = header.logo;
        }

        // Set Favicon
        if (header.favicon) {
          const isInvalidFaviconFormat =
            !header.favicon.split('?')[0].endsWith('.ico') &&
            !header.favicon.startsWith('data:image');
          if (isInvalidFaviconFormat) {
            console.warn(
              'Favicon is not an .ico filetype and might get displayed wrong.'
            );
          }
          const link = Object.assign(document.createElement('link'), {
            type: 'image/x-icon',
            rel: 'shortcut icon',
            href: header.favicon
          });
          const head = document.getElementsByTagName('head')[0];
          head.childNodes.forEach(child => {
            if (child.rel === 'shortcut icon') {
              child.remove();
            }
          });
          head.appendChild(link);
        }
      });
    },
    ['settings.header']
  );
};

export const updateTitle = component => {
  const appSwitcherItems = component.get().appSwitcherItems;
  const pathData = component.get().pathData;
  let selectedItem;
  if (appSwitcherItems && pathData) {
    appSwitcherItems.some(item => {
      let match = true;
      GenericHelpers.trimTrailingSlash(
        GenericHelpers.trimLeadingSlash(item.link)
      )
        .split('/')
        .forEach((pathSegment, index) => {
          if (match) {
            if (index + 1 >= pathData.length) {
              match = false;
            } else if (
              !pathData[index + 1].pathSegment ||
              (pathSegment !== pathData[index + 1].pathSegment &&
                !pathData[index + 1].pathSegment.startsWith(':'))
            ) {
              match = false;
            }
          }
        });
      if (match) {
        selectedItem = item;
      }
      return match;
    });
  }
  const title =
    selectedItem && selectedItem.label
      ? selectedItem.label
      : component.get().defaultTitle;
  component.set({ title });
  document.title = LuigiI18N.getTranslation(title);
};
