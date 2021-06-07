import { APP_INITIALIZER, NgModule } from '@angular/core';

// @dynamic
@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: LuigiMockModule.initPostMessageHook,
      multi: true
    }
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
export class LuigiMockModule {
  // Add a hook to the post message api to mock the LuigiCore response to the Client
  public static initPostMessageHook() {
    return async (): Promise<void> => {
      // Check if Luigi Client is running standalone
      if (window.parent === window) {
        console.debug('Detected standalone mode');

        // Check and skip if Luigi environment is already mocked
        if ((window as any).luigiMockEnvironment) {
          return;
        }

        (window as any).luigiMockEnvironment = {
          msgListener: function(e: any) {
            if (e.data.msg && (e.data.msg.startsWith('luigi.') || e.data.msg === 'storage')) {
              console.debug('Luigi msg', e.data);

              if (e.data.msg === 'luigi.get-context') {
                window.postMessage(
                  {
                    msg: 'luigi.init',
                    emulated: true,
                    internal: {
                      viewStackSize: 1
                    },
                    context: e.data.context
                  },
                  '*'
                );
              }

              // vizualise retrieved event data
              LuigiMockModule.visualize(e.data);

              // Check and run mocked callback if it exists
              const mockListener = (window as any).luigiMockEnvironment.mockListeners[e.data.msg];
              if (mockListener) {
                mockListener(e);
              }
            }
          },
          mockListeners: {
            'luigi.navigation.pathExists': (event: any) => {
              const response = {
                msg: 'luigi.navigation.pathExists.answer',
                data: {
                  correlationId: event.data.data.id,
                  pathExists: true
                },
                emulated: true
              };
              window.postMessage(response, '*');
            },
            //ux
            'luigi.ux.confirmationModal.show': (event: any) => {
              const response = {
                msg: 'luigi.ux.confirmationModal.hide',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'luigi.ux.alert.show': (event: any) => {
              const response = {
                msg: 'luigi.ux.alert.hide',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'luigi.ux.set-current-locale': (event: any) => {
              const response = {
                msg: 'luigi.current-locale-changed',
                currentLocale: event.data.data.currentLocale,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            // linkManager
            'luigi.navigation.open': (event: any) => {
              const response = {
                msg: 'luigi.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'luigi.navigation.splitview.close': (event: any) => {
              const response = {
                msg: 'luigi.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'luigi.navigation.splitview.collapse': (event: any) => {
              const response = {
                msg: 'luigi.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            'luigi.navigation.splitview.expand': (event: any) => {
              const response = {
                msg: 'luigi.navigate.ok',
                data: event.data,
                emulated: true
              };
              window.postMessage(response, '*');
            },
            // storage
            storage: () => {}
          }
        };

        // Listen to the global 'message' event of the window object
        window.addEventListener('message', (window as any).luigiMockEnvironment.msgListener);
      }
    };
  }

  /*
   * This method takes a data object of type 'any' and vizualizes a simple container
   * which holds data that is useful for e2e testing.
   */
  public static visualize(data: any): void {
    let luigiVisualizationContainer: Element | null = document.querySelector('#luigi-debug-vis-cnt');
    // Construct element structure if not already constructed
    if (!luigiVisualizationContainer) {
      luigiVisualizationContainer = document.createElement('div');
      luigiVisualizationContainer.setAttribute('id', 'luigi-debug-vis-cnt');
      // TODO: Find a more suitable way to hide the element from the end user
      // Currently needs a workaround to work.
      // luigiVisualizationContainer.setAttribute('style', 'overflow:hidden;height:0;');
      document.body.appendChild(luigiVisualizationContainer);
    }
    const line: HTMLDivElement = document.createElement('div');
    line.innerHTML = JSON.stringify(data);
    luigiVisualizationContainer.appendChild(line);
  }
}
