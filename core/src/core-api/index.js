import { config } from './config';
import { auth } from './auth';

export const LuigiConfig = config;
export const LuigiAuth = auth;

// Expose it window for user app to call Luigi.setConfig()
window.Luigi = Object.assign(
  config,
  auth
);
