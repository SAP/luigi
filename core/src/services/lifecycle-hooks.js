import { LuigiUX, LuigiConfig } from './../core-api';

class LuigiLifecycleHooks {
  luigiAfterInit() {
    const shouldHideAppLoadingIndicator = LuigiConfig.getConfigBooleanValue(
      'settings.appLoadingIndicator.autoHideEnabled'
    );
    if (shouldHideAppLoadingIndicator) {
      // Settimeout needed, otherwise app loading indicator might not present yet and when displayed will not be hidden
      setTimeout(() => {
        LuigiUX.hideAppLoadingIndicator();
      }, 0);
    }
  }
}

export const LifecycleHooks = new LuigiLifecycleHooks();
