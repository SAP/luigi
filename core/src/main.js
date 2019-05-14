import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { LuigiConfig } from './core-api';

const configReadyCallback = () => {
  const authLib = LuigiConfig.getConfigValue('auth.use');
  if (authLib && authLibraries[authLib]) {
    authLibraries[authLib]();
  }

  new App({
    target: document.querySelector('body'),
    data: {}
  });
};

Luigi.setConfigCallbacks(configReadyCallback);
