import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { LuigiConfig } from './services/config';

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

const configNotReadyCallback = function() {
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
};

Luigi.setConfigCallbacks(configReadyCallback, configNotReadyCallback);
