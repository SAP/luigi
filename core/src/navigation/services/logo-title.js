import {
  getConfigValueAsync,
  getConfigBooleanValue
} from '../../services/config.js';

export const processHeaderSettings = component => {
  getConfigValueAsync('settings.header').then(header => {
    if (!header) {
      return;
    }

    // Set Title and Logo
    if (header.title) {
      component.set({ title: header.title });
      document.title = header.title;
    }
    if (header.logo) {
      component.refs.logo.style.backgroundImage = 'url(' + header.logo + ')';
    }

    // Set Favicon
    if (header.favicon) {
      if (!header.favicon.split('?')[0].endsWith('.ico')) {
        console.warn(
          'Favicon is not an .ico filetype and might get displayed wrong.'
        );
      }
      const link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = header.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  });
};
