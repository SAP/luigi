import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { getConfigValue } from './services/config';
import { waitForKeyExistency } from './utilities/async-helpers.js';

const authLib = getConfigValue('auth.use');
if (authLib && authLibraries[authLib]) {
  authLibraries[authLib]();
}

let app;

(async () => {
  try {
    const isLuigiConfigLoaded = await waitForKeyExistency(
      window.Luigi,
      'config'
    );
    if (isLuigiConfigLoaded) {
      const app = new App({
        target: document.querySelector('body'),
        data: {}
      });
      window.app = app;
    } else {
      console.error(
        'Missing Luigi.config. Please configure Luigi via Luigi.setConfig(config) function'
      );
    }
  } catch (e) {
    console.error(
      'Missing Luigi.config. Please configure Luigi via Luigi.setConfig(config) function'
    );
  }
})();

export default app;
