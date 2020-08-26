import { config } from './config';
import { auth } from './auth';
import { elements } from './dom-elements';
import { navigation } from './navigation';
import { i18n } from './i18n';
import { customMessages } from './custom-messages';
import { ux } from './ux';
import { globalSearch } from './globalsearch';
import { featureToggles } from './featuretoggles';

export const LuigiConfig = config;
export const LuigiAuth = auth;
export const LuigiElements = elements;
export const LuigiNavigation = navigation;
export const LuigiI18N = i18n;
export const LuigiCustomMessages = customMessages;
export const LuigiUX = ux;
export const LuigiGlobalSearch = globalSearch;
export const LuigiFeatureToggles = featureToggles;

// Expose it window for user app to call Luigi.setConfig()
window.Luigi = config;
window.Luigi.auth = () => auth;
window.Luigi.elements = () => elements;
window.Luigi.navigation = () => navigation;
window.Luigi.i18n = () => i18n;
window.Luigi.customMessages = () => customMessages;
window.Luigi.ux = () => ux;
window.Luigi.globalSearch = () => globalSearch;
window.Luigi.featureToggles = () => featureToggles;
