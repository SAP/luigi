import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { LuigiConfig, LuigiElements } from './core-api';
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

  // setTimeout needed so that luigi container is rendered when we retrieve it
  let app;
  setTimeout(() => {
    const luigiContainer = LuigiElements.getLuigiContainer();

    if (LuigiElements.isCustomLuigiContainer()) {
      document
        .getElementsByTagName('html')[0]
        .classList.add('luigi-app-in-custom-container');
    }

    app = new App({
      target: luigiContainer,
      store
    });

    Luigi._app = app;
  });

  Luigi.showAlert = settings => {
    return app.showAlert(settings);
  };

  Luigi.showConfirmationModal = settings => {
    return app.showModal(settings);
  };
};

LuigiConfig.setConfigCallbacks(configReadyCallback);
