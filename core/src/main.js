import App from './App.html';
import { LuigiConfig, LuigiI18N, LuigiElements } from './core-api';
import { writable, readable } from 'svelte/store';
import { AuthLayerSvc } from './services';
const createConfigStore = () => {
  const { subscribe, update, reset } = writable({});
  const scopeSubscribers = {};
  return {
    subscribe,
    update,
    reset,
    subscribeToScope: (fn, scope) => {
      let subscribers = scopeSubscribers[scope];
      if (!subscribers) {
        subscribers = new Set();
        scopeSubscribers[scope] = subscribers;
      }
      subscribers.add(fn);
    },
    fire: (scope, data) => {
      let subscribers = scopeSubscribers[scope];
      if (subscribers) {
        [...subscribers].forEach(fn => {
          fn(data);
        });
      }
    }
  };
};

export const store = createConfigStore();
export const getTranslation = readable((key, interpolations, locale) => {
  return LuigiI18N.getTranslation(key, interpolations, locale);
});

Luigi._store = store;

const configReadyCallback = () => {
  return new Promise(resolve => {
    LuigiI18N._init();

    AuthLayerSvc.init().then(() => {
      // setTimeout needed so that luigi container is rendered when we retrieve it
      setTimeout(() => {
        let app;

        if (LuigiElements.isCustomLuigiContainer()) {
          document
            .getElementsByTagName('html')[0]
            .classList.add('luigi-app-in-custom-container');
        }

        app = new App({
          target: LuigiElements.getLuigiContainer(),
          props: {
            store,
            getTranslation
          }
        });

        Luigi.showAlert = settings => {
          return app.$$.ctx.showAlert(settings);
        };

        Luigi.showConfirmationModal = settings => {
          return app.$$.ctx.showModal(settings);
        };

        Luigi.splitView = {
          openAsSplitView: (path, settings) =>
            app.$$.ctx.openSplitView(path, settings),
          splitViewHandle: {
            close: () => app.$$.ctx.closeSplitView(),
            collapse: () => app.$$.ctx.collapseSplitView(),
            expand: () => app.$$.ctx.expandSplitView(),
            isCollapsed: () => app.$$.ctx.isSplitViewCollapsed(),
            isExpanded: () => app.$$.ctx.isSplitViewExpanded(),
            exists: () => app.$$.ctx.existsSplitView()
          }
        };

        Luigi.pathExists = path => {
          return app.$$.ctx.pathExists(path);
        };

        Luigi.hasBack = () => {
          return app.$$.ctx.hasBack();
        };

        resolve();
      });
    });
  });
};

LuigiConfig.setConfigCallbacks(configReadyCallback);
