import App from './App.html';
import { authLibraries } from './providers/auth/libraryLoaders';
import { getConfigValue } from './services/config';

const authLib = getConfigValue('auth.use');
if (authLib && authLibraries[authLib]) {
    authLibraries[authLib]();
}

const app = new App({
  target: document.querySelector('body'),
  data: {}
});

window.app = app;

export default app;
