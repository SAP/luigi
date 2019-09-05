import { LuigiUX, LuigiConfig } from './../core-api';

class LuigiLifecycleHooks {
  luigiAfterInit() {
    const shouldHideAppLoadingIndicator = LuigiConfig.getConfigBooleanValue(
      'settings.appLoadingIndicator.autoHideEnabled'
    );
    if (shouldHideAppLoadingIndicator) {
      LuigiUX.hideAppLoadingIndicator();
    }
  }
}

export const LifecycleHooks = new LuigiLifecycleHooks();
