sap.ui.define(['sap/ui/model/json/JSONModel', '@luigi-project/client/luigi-client'], function(JSONModel, LuigiClient) {
  const model = new JSONModel();

  LuigiClient.addInitListener(ctx => {
    console.log('ctx init', ctx);
    model.setData(ctx);
  });

  LuigiClient.addContextUpdateListener(ctx => {
    console.log('ctx update', ctx);
    model.setData(ctx);
  });

  return {
    connectTo: function(oComponent) {
      const routingConfig = oComponent.getManifestEntry('sap.ui5').routing;
      oComponent.setModel(model, '$luigi');
      oComponent.getRouter().attachRouteMatched(oEvent => {
        const currentRoute = oEvent.getParameter('name');
        const args = oEvent.getParameter('arguments');
        let currentRouteObj = {};
        routingConfig.routes.every(routeObj => {
          if (routeObj.name === currentRoute) {
            currentRouteObj = routeObj;
            currentRouteObj.arguments = args;
            return false;
          }
          return true;
        });

        if (currentRouteObj) {
          let lm = LuigiClient.linkManager().withoutSync();
          const ux = LuigiClient.uxManager();
          let route = currentRoute;
          // TODO Is this check neccessary?
          // if (currentRouteObj.target === currentRoute || (Array.isArray(currentRouteObj.target) && currentRouteObj.target.pop() === currentRoute)) {
          if (currentRouteObj.data) {
            if (currentRouteObj.data.luigiRoute) {
              route = currentRouteObj.data.luigiRoute;

              if (currentRouteObj.arguments) {
                for (const [key, value] of Object.entries(currentRouteObj.arguments)) {
                  route = route.replace(`:${key}`, value);
                }
                // if (currentRouteObj.arguments['?query'] !== undefined) {
                //     let searchParams = new URLSearchParams(currentRouteObj.arguments['?query']);
                //     route += `?${searchParams.toString()}`;
                // }
              }
              if (currentRouteObj.data.fromContext) {
                if (currentRouteObj.data.fromContext === true) {
                  lm = lm.fromClosestContext();
                } else {
                  lm = lm.fromContext(currentRouteObj.data.fromContext);
                }
              }
            } else {
              if (currentRouteObj.data.fromVirtualTreeRoot) {
                console.log(oEvent);
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
            }
          }
          if (ux.isModal()) {
            if (currentRouteObj.data.updateModalDataPath) {
              lm.updateModalPathInternalNavigation(route, {}, currentRouteObj.data.addHistoryEntry);
            }
          } else if (route) {
            route === 'main' ? (route = '') : route;
            lm.navigate(route);
          }
          // }
        }
      });
    }
  };
});
