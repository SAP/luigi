import { NgModule, provideAppInitializer } from '@angular/core';
import { LuigiMockEngine } from '@luigi-project/testing-utilities';

// @dynamic
@NgModule({
  providers: [
    provideAppInitializer(() => {
        const initializerFn = (LuigiMockEngine.initPostMessageHook)();
        return initializerFn();
      })
  ]
})
/*
 * This class mocks Luigi Core related functionality.
 *
 * Micro Frontends that use Luigi Client would usually communicate with Luigi Core
 * back and forth. When testing Luigi Client based components, Luigi Core might
 * not be present which leads into limitations on integration/e2e testing for standalone
 * microfrontends.
 *
 * This module adds a hook to the window postMessage API by adding an event listener to the
 * global message event of the window object and mocking the callback.
 * In the normal workflow this message would picked up by Luigi Core which then sends the response back.
 */
export class LuigiMockModule {}
