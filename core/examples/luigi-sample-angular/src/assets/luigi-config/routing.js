class Routing {
  /**
   * useHashRouting
   *
   * Development:
   * For hash routing, set to true and run `npm run start`
   * For path routing, set to false and run `npm run start`
   */
  get useHashRouting() {
    return false;
  }
  /**
   * Prefix for reflecting params in the url, which is used when navigating .withParams() function.
   */
  get nodeParamPrefix() {
    return '~';
  }
  /**
   * skipRoutingForUrlPatterns
   * Define regex patterns that prevent the router from handling path changes.
   * Used to exclude authentication or other callbacks.
   *
   * Default: /access_token=/, /id_token=/
   */
  get skipRoutingForUrlPatterns() {
    return [/access_token=/, /id_token=/];
  }
}

export const routing = new Routing();
