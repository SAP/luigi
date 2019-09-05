class LifecycleHooks {
  luigiAfterInit() {
    // fallback in case some micro frontend did not send 'my-microfrontend-is-ready' custom message
    // (settings.appLoadingIndicator.autoHideEnabled is set to false)
    setTimeout(() => {
      Luigi.ux().hideAppLoadingIndicator();
    }, 5000);
  }
}

export const lifecycleHooks = new LifecycleHooks();
