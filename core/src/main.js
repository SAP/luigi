import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { getConfigValue } from './services/config';
import { waitForKeyExistency } from './utilities/async-helpers.js';

let app;
waitForKeyExistency(
  window.Luigi,
  'config'
).then((isLuigiConfigLoaded) => {
  if (isLuigiConfigLoaded) {
    const authLib = getConfigValue('auth.use');
    if (authLib && authLibraries[authLib]) {
      authLibraries[authLib]();
    }

    app = new App({
      target: document.querySelector('body'),
      data: {}
    });
    window.app = app;
  } else {
    console.error(
      'Missing Luigi.config. Please configure Luigi via Luigi.setConfig(config) function'
    );
  }
});

export default app;
