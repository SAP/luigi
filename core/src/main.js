import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { LuigiConfig, LuigiElements } from './core-api';
import { Store } from 'svelte/store';
import { version } from '../package.json';
import { CUSTOM_LUIGI_CONTAINER } from './utilities/constants';
const store = new Store({
  luigiVersion: version
});

Luigi._store = store;

const configReadyCallback = () => {
  const authLib = LuigiConfig.getConfigValue('auth.use');
  if (authLib && authLibraries[authLib]) {
    authLibraries[authLib]();
  }

  let app;
  // setTimeout needed so that luigi container is rendered when we retrieve it
  setTimeout(() => {
    const luigiContainer = LuigiElements.getLuigiContainer();

    if (luigiContainer === LuigiElements.getCustomLuigiContainer()) {
      document
        .getElementsByTagName('html')[0]
        .classList.add('luigi-app-in-custom-container');
      const luigiCustomContainerSettings =
        LuigiConfig.getConfig().settings?.luigiContainer || {};
      luigiContainer.style.height =
        luigiCustomContainerSettings.height ||
        CUSTOM_LUIGI_CONTAINER.cssDefaultHeight;
      luigiContainer.style.width =
        luigiCustomContainerSettings.width ||
        CUSTOM_LUIGI_CONTAINER.cssDefaultWidth;
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
