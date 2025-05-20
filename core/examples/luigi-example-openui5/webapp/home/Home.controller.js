sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/UIComponent',
    'luigi/demo/libs/luigi-client/luigi-client'
  ],
  (Controller, UIComponent) => {
    'use strict';

    return Controller.extend('luigi.demo.home.Home', {
      getRouter: function() {
        return UIComponent.getRouterFor(this);
      },

      onInit: function() {
        LuigiClient.addInitListener(initialContext => {
          this.getView()
            .byId('luigi-initialized')
            .setText('Luigi Client Initialized!');
          console.log('Luigi Client Initialized!');
        });

        LuigiClient.addContextUpdateListener(updatedContext => {
          console.log('Luigi Client Updated!');
        });
      }
    });
  }
);
