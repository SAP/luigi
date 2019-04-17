import { config } from './config';
import { auth } from './auth';

export const LuigiConfig = config;
export const LuigiAuth = auth;

// Expose it window for user app to call Luigi.setConfig() or Luigi.config.setConfig()
window.Luigi = Object.assign(
  config, // resilience until @deprecated
  {
    config,
    auth
  }
);
