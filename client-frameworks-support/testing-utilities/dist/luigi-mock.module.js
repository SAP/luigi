'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var LuigiMockModule_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.LuigiMockModule = void 0;
const core_1 = require('@angular/core');
// @dynamic
let LuigiMockModule = (LuigiMockModule_1 =
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
  class LuigiMockModule {
    // Add a hook to the post message api to mock the LuigiCore response to the Client
    static initPostMessageHook() {
      return () =>
        __awaiter(this, void 0, void 0, function*() {
          // Check if Luigi Client is running standalone
          if (window.parent === window) {
            console.debug('Detected standalone mode');
            // Check and skip if Luigi environment is already mocked
            if (window.luigiMockEnvironment) {
              return;
            }
            window.luigiMockEnvironment = {
              msgListener: function(e) {
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
                  LuigiMockModule_1.visualize(e.data);
                  // Check and run mocked callback if it exists
                  const mockListener = window.luigiMockEnvironment.mockListeners[e.data.msg];
                  if (mockListener) {
                    mockListener(e);
                  }
                }
              },
              mockListeners: {
                'luigi.navigation.pathExists': event => {
                  const mockData = window.sessionStorage.getItem('luigiMockData');
                  let mockDataParsed = mockData ? JSON.parse(mockData) : undefined;
                  const inputPath = event.data.data.link;
                  const pathExists =
                    mockDataParsed && mockDataParsed.pathExists && mockDataParsed.pathExists[inputPath];
                  const response = {
                    msg: 'luigi.navigation.pathExists.answer',
                    data: {
                      correlationId: event.data.data.id,
                      pathExists: pathExists ? pathExists : false
                    },
                    emulated: true
                  };
                  window.postMessage(response, '*');
                },
                //ux
                'luigi.ux.confirmationModal.show': event => {
                  const response = {
                    msg: 'luigi.ux.confirmationModal.hide',
                    data: event.data,
                    emulated: true
                  };
                  window.postMessage(response, '*');
                },
                'luigi.ux.alert.show': event => {
                  const response = {
                    msg: 'luigi.ux.alert.hide',
                    data: event.data,
                    emulated: true
                  };
                  window.postMessage(response, '*');
                },
                'luigi.ux.set-current-locale': event => {
                  const response = {
                    msg: 'luigi.current-locale-changed',
                    currentLocale: event.data.data.currentLocale,
                    emulated: true
                  };
                  window.postMessage(response, '*');
                },
                // linkManager
                'luigi.navigation.open': event => {
                  const response = {
                    msg: 'luigi.navigate.ok',
                    data: event.data,
                    emulated: true
                  };
                  window.postMessage(response, '*');
                },
                'luigi.navigation.splitview.close': event => {
                  const response = {
                    msg: 'luigi.navigate.ok',
                    data: event.data,
                    emulated: true
                  };
                  window.postMessage(response, '*');
                },
                'luigi.navigation.splitview.collapse': event => {
                  const response = {
                    msg: 'luigi.navigate.ok',
                    data: event.data,
                    emulated: true
                  };
                  window.postMessage(response, '*');
                },
                'luigi.navigation.splitview.expand': event => {
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
            window.addEventListener('message', window.luigiMockEnvironment.msgListener);
          }
        });
    }
    /*
     * This method takes a data object of type 'any' and vizualizes a simple container
     * which holds data that is useful for e2e testing.
     */
    static visualize(data) {
      let luigiVisualizationContainer = document.querySelector('#luigi-debug-vis-cnt');
      // Construct element structure if not already constructed
      if (!luigiVisualizationContainer) {
        luigiVisualizationContainer = document.createElement('div');
        luigiVisualizationContainer.setAttribute('id', 'luigi-debug-vis-cnt');
        // TODO: Find a more suitable way to hide the element from the end user
        // Currently needs a workaround to work.
        // luigiVisualizationContainer.setAttribute('style', 'overflow:hidden;height:0;');
        document.body.appendChild(luigiVisualizationContainer);
      }
      const line = document.createElement('div');
      line.innerHTML = JSON.stringify(data);
      luigiVisualizationContainer.appendChild(line);
    }
  });
LuigiMockModule = LuigiMockModule_1 = __decorate(
  [
    core_1.NgModule({
      providers: [
        {
          provide: core_1.APP_INITIALIZER,
          useFactory: LuigiMockModule_1.initPostMessageHook,
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
  ],
  LuigiMockModule
);
exports.LuigiMockModule = LuigiMockModule;
