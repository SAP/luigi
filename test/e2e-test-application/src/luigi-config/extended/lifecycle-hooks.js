import { globalSearch } from './globalSearch';
import { i18nProvider } from './i18n-provider';

class LifecycleHooks {
  async luigiAfterInit() {
    // fallback in case some micro frontend did not send 'my-microfrontend-is-ready' custom message
    // (settings.appLoadingIndicator.hideAutomatically is set to false)

    // Example to enable docSearch
    //globalSearch.search.initDocSearch();

    const fallbackHideTimeout = 5000;
    setTimeout(() => {
      Luigi.ux().hideAppLoadingIndicator();
    }, fallbackHideTimeout);

    await i18nProvider.afterInit();
  }
}

export const lifecycleHooks = new LifecycleHooks();
