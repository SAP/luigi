import { config } from './config';
import { auth } from './auth';
import { elements } from './dom-elements';

export const LuigiConfig = config;
export const LuigiAuth = auth;
export const LuigiElements = elements;

// Expose it window for user app to call Luigi.setConfig()
window.Luigi = config;
window.Luigi.auth = () => auth;
window.Luigi.elements = () => elements;
