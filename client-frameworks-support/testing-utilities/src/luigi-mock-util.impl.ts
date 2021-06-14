export class LuigiMockUtil {
  private messages: any[];
  private browser: any;

  constructor(browser: any) {
    this.messages = [];
    this.browser = browser;
  }

  // TODO - add comments
  async parseLuigiMockedMessages(): Promise<void> {
    const elements = await this.browser.$$('#luigi-debug-vis-cnt > div').getWebElements();

    this.messages = (await Promise.all(
      elements.map(async (item: any) => {
        let text = await item.getText();
        try {
          return JSON.parse(text);
        } catch (error) {
          return undefined;
        }
      })
    )).filter(item => item !== undefined);
  }

  // TODO - Add comments
  mockContext = (mockContext: any) => {
    this.browser.executeScript((mockContext: any) => {
      globalThis.postMessage({ msg: 'luigi.get-context', context: mockContext }, '*');
    }, mockContext);
  };

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
  mockPathExists(path: string, exists: boolean) {
    this.browser.executeScript(
      (path: string, exists: boolean) => {
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
