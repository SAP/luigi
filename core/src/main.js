import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { LuigiConfig } from './core-api';
import { Store } from 'svelte/store';
import { version } from '../package.json';

const store = new Store({
  luigiVersion: version
});

Luigi._store = store;

const configReadyCallback = () => {
  const authLib = LuigiConfig.getConfigValue('auth.use');
  if (authLib && authLibraries[authLib]) {
    authLibraries[authLib]();
  }

  const app = new App({
    target: document.querySelector('body'),
    store
  });

  Luigi._app = app;

  Luigi.showAlert = settings => {
    return app.showAlert(settings);
  };

  Luigi.showConfirmationModal = settings => {
    return app.showModal(settings);
  };
};

LuigiConfig.setConfigCallbacks(configReadyCallback);
