'use strict';
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.LuigiMockUtil = void 0;
class LuigiMockUtil {
  constructor(browser) {
    // TODO - Add comments
    this.mockContext = mockContext => {
      this.browser.executeScript(mockContext => {
        globalThis.postMessage({ msg: 'luigi.get-context', context: mockContext }, '*');
      }, mockContext);
    };
    this.messages = [];
    this.browser = browser;
  }
  // TODO - add comments
  parseLuigiMockedMessages() {
    return __awaiter(this, void 0, void 0, function*() {
      const elements = yield this.browser.$$('#luigi-debug-vis-cnt > div').getWebElements();
      this.messages = (yield Promise.all(
        elements.map(item =>
          __awaiter(this, void 0, void 0, function*() {
            let text = yield item.getText();
            try {
              return JSON.parse(text);
            } catch (error) {
              return undefined;
            }
          })
        )
      )).filter(item => item !== undefined);
    });
  }
  /**
   * This method serves as a mock for the luigi client pathExists() function.
   * It is used in e2e tests when component being tested utilizes a call to `LuigiClient.linkManager().pathExists()`
   *
   * @param path the path to check
   * @param exists mocked boolean representing if path should exist or not
   * @example
   * // For the following call in your angular component:
   * LuigiClient.linkManager().pathExists('pathToCheck')
   *
   * // You need to call the following to mock pathExists() returning `true` for a given 'pathToCheck':
   * await mockPathExists('pathToCheck', true);
   *
   * // You need to call the following to mock pathExists() returning `false` for a given 'pathToCheck':
   * await mockPathExists('pathToCheck', false);
   *
   */
  mockPathExists(path, exists) {
    this.browser.executeScript(
      (path, exists) => {
        globalThis.sessionStorage.clear();
        let pathExistsMockData = {
          pathExists: {
            [path]: exists
          }
        };
        globalThis.sessionStorage.setItem('luigiMockData', JSON.stringify(pathExistsMockData));
      },
      path,
      exists
    );
  }
  // TODO - Add comments
  getMSG() {
    return this.messages;
  }
}
exports.LuigiMockUtil = LuigiMockUtil;
