import { globalSearch } from './globalSearch';
class LifecycleHooks {
  luigiAfterInit() {
    // fallback in case some micro frontend did not send 'my-microfrontend-is-ready' custom message
    // (settings.appLoadingIndicator.hideAutomatically is set to false)
    const fallbackHideTimeout = 5000;
    setTimeout(() => {
      Luigi.ux().hideAppLoadingIndicator();
    }, fallbackHideTimeout);
    //globalSearch.search.triggerDocSearch();
  }
}

export const lifecycleHooks = new LifecycleHooks();
