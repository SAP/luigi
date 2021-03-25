export const CSS_BREAKPOINTS = {
  desktopMinWidth: 600,
};

export const MICROFRONTEND_TYPES = [
  { type: 'main', selector: '.iframeContainer iframe' },
  { type: 'split-view', selector: '.iframeSplitViewCnt iframe' },
  { type: 'modal', selector: '.iframeModalCtn._modal iframe' },
  { type: 'drawer', selector: '.iframeModalCtn._drawer iframe' },
  { type: 'user-settings', selector: '.iframeUserSettingsCtn iframe' },
];

export const CUSTOM_LUIGI_CONTAINER = {
  cssSelector: '[luigi-app-root]',
};

export const APP_LOADING_INDICATOR = {
  cssSelector: '[luigi-app-loading-indicator]',
};
