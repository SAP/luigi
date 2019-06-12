import { StateHelpers } from '../../utilities/helpers/state-helpers';
import { LuigiConfig } from './../../core-api';

export const processHeaderSettings = component => {
  StateHelpers.doOnStoreChange(component.store, () => {
    return LuigiConfig.getConfigValueAsync('settings.header').then(header => {
      if (!header) {
        return;
      }
      // Set Title and Logo
      if (header.title) {
        component.set({ title: header.title });
        document.title = header.title;
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
  });
};
