sap.ui.define(['sap/ui/core/UIComponent'], (UIComponent) => {
  'use strict';

  return UIComponent.extend('luigi.demo.Component', {
    metadata: {
      interfaces: ['sap.ui.core.IAsyncContentCreation'],
      manifest: 'json',
    },

    init() {
      UIComponent.prototype.init.apply(this, arguments);
      this.getRouter().initialize();
    }
  });
});
