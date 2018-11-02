import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { getConfigValue } from './services/config';
import { waitForKeyExistency } from './utilities/helpers-async.js';

let app;
waitForKeyExistency(window.Luigi, 'config').then(
  isLuigiConfigLoaded => {
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
    }
  },
  e => {
    const errorMsg =
      'Ups.. Looks like Luigi was not configured. Please use Luigi.setConfig(config) function to configure Luigi.';
    console.error(errorMsg);
    var errorTextNode = document.createTextNode(errorMsg);
    var fd_ui = document.createElement('div');
    fd_ui.setAttribute('class', 'fd-ui');
    fd_ui.setAttribute('style', 'text-align: center;');

    var errorDiv = document.createElement('div');
    errorDiv.setAttribute('class', 'fd-alert fd-alert--error');
    errorDiv.setAttribute(
      'style',
      'max-width: 800px; display: inline-block; margin-top: 40px;'
    );
    errorDiv.appendChild(errorTextNode);

    fd_ui.appendChild(errorDiv);
    document.body.appendChild(fd_ui);
  }
);

export default app;
