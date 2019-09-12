import { config } from './config';
import { auth } from './auth';
import { elements } from './dom-elements';
import { navigation } from './navigation';
import { i18n } from './i18n';
import { customMessages } from './custom-messages';
import { ux } from './ux';

export const LuigiConfig = config;
export const LuigiAuth = auth;
export const LuigiElements = elements;
export const LuigiNavigation = navigation;
export const LuigiI18N = i18n;
export const LuigiCustomMessages = customMessages;
export const LuigiUX = ux;

// Expose it window for user app to call Luigi.setConfig()
window.Luigi = config;
window.Luigi.auth = () => auth;
window.Luigi.elements = () => elements;
window.Luigi.navigation = () => navigation;
window.Luigi.i18n = () => i18n;
window.Luigi.customMessages = () => customMessages;
window.Luigi.ux = () => ux;
