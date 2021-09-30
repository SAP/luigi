class Routing {
  /**
   * useHashRouting
   *
   * Development:
   * For hash routing, set to true and run `npm run start`
   * For path routing, set to false and run `npm run start`
   */
  useHashRouting = false;
  
  pageNotFoundHandler = (wrongPath, wasAnyPathFitted) => {
    console.log("Wrong path, fitted", wrongPath, wasAnyPathFitted);
      Luigi.showAlert({
        text: `Path not found---------: ${wrongPath}`,
        type: 'error',
        closeAfter: 3000
      });
    
    return {redirectTo: "errors"};
  };

  /**
   * Prefix for reflecting params in the url, which is used when navigating .withParams() function.
   */
  nodeParamPrefix = '~';
  disableBrowserHistory = false;

  /**
   * skipRoutingForUrlPatterns
   * Define regex patterns that prevent the router from handling path changes.
   * Used to exclude authentication or other callbacks.
   *
   * Default: /access_token=/, /id_token=/
   */
  skipRoutingForUrlPatterns = [/access_token=/, /id_token=/];
}

export const routing = new Routing();
