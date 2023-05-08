sap.ui.define(['sap/ui/model/json/JSONModel', '@luigi-project/client/luigi-client'], function(JSONModel, LuigiClient) {
  const model = new JSONModel();
  LuigiClient.addInitListener(ctx => {
    model.setData(ctx);
  });

  LuigiClient.addContextUpdateListener(ctx => {
    model.setData(ctx);
  });

  return {
    LuigiClient,
    connectTo: function(oComponent) {
      const routingConfig = oComponent.getManifestEntry('sap.ui5').routing;
      oComponent.setModel(model, '$luigiCtx');

      // Create preload view
      sap.ui.define('luigi-ui5-support-lib/LuigiPreloadView', ['sap/ui/core/mvc/View', 'sap/ui/core/HTML'], function(
        View,
        HTML
      ) {
        const PreloadView = View.extend('luigi-ui5-support-lib.LuigiPreloadView', {
          getControllerName: function() {},
          createContent: function() {
            return new HTML({ content: '<div></div>' });
          }
        });
        return PreloadView;
      });

      const oRouter = oComponent.getRouter();
      oRouter.getTargets().addTarget('LuigiPreloadView', {
        id: 'LuigiPreloadView',
        name: 'module:luigi-ui5-support-lib/LuigiPreloadView',
        type: 'View',
        viewType: 'JS',
        viewPath: '',
        path: '',
        level: 1
      });
      oRouter.addRoute({
        pattern: '__luigi_preload_view__',
        name: 'LuigiPreloadView',
        target: 'LuigiPreloadView'
      });

      oComponent.getRouter().attachRouteMatched(oEvent => {
        const currentRoute = oEvent.getParameter('name');
        const args = oEvent.getParameter('arguments');
        let currentRouteObj = {};

        //find current route in manifest
        routingConfig.routes.every(routeObj => {
          if (routeObj.name === currentRoute) {
            currentRouteObj = routeObj;
            currentRouteObj.arguments = args;
            return false;
          }
          return true;
        });

        if (currentRouteObj && Object.keys(currentRouteObj).length > 0) {
          let lm = LuigiClient.linkManager().withoutSync();
          const ux = LuigiClient.uxManager();
          let route = currentRoute;
          if (currentRouteObj.data && currentRouteObj.data.luigiRoute) {
            route = currentRouteObj.data.luigiRoute;
            if (currentRouteObj.arguments) {
              for (const [key, value] of Object.entries(currentRouteObj.arguments)) {
                route = route.replace(`:${key}`, value);
              }
            }
            if (currentRouteObj.data.fromContext) {
              if (currentRouteObj.data.fromContext === true) {
                lm = lm.fromClosestContext();
              } else {
                lm = lm.fromContext(currentRouteObj.data.fromContext);
              }
            }
          } else if (currentRouteObj.data && currentRouteObj.data.fromVirtualTreeRoot) {
            let url = location.hash.split('#/')[1];
            const truncate = currentRouteObj.data.fromVirtualTreeRoot.truncate;
            if (truncate) {
              if (truncate.indexOf('*') === 0) {
                const index = url.indexOf(truncate.substr(1));
                url = url.substr(index + truncate.length - 1);
              } else if (url.indexOf(truncate) === 0) {
                url = url.substr(truncate.length);
              }
            }
            route = url;
            console.debug('Calling fromVirtualTreeRoot for url ==> ' + route);
            lm = lm.fromVirtualTreeRoot();
          }
          if (ux.isModal()) {
            if (currentRouteObj.data.updateModalDataPath) {
              lm.updateModalPathInternalNavigation(route, {}, currentRouteObj.data.addHistoryEntry);
            }
          } else if (route) {
            lm.navigate(route);
          }
        }
      });
    }
  };
});
