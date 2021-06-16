export class LuigiMockUtil {
  private messages: any[];
  private browser: any;

  constructor(browser: any) {
    this.messages = [];
    this.browser = browser;
  }

  /**
   * Parses the elements added by LuigiMockModule into the DOM and assigns them to the local this.messages variable
   */
  async parseLuigiMockedMessages(): Promise<void> {
    try {
      const textElements: string[] = await this.browser.executeScript(() =>
        Array.from(document.getElementById('luigi-debug-vis-cnt').childNodes).map(item => item.textContent)
      );
      this.messages = textElements
        .map((item: string) => {
          try {
            return JSON.parse(item);
          } catch (error) {
            return undefined;
          }
        })
        .filter(item => item !== undefined);
    } catch (e) {
      console.debug('Failed to parse luigi mocked messages: ', e);
    }
  }

  /**
   * Mocks the context by sending luigi context messegaes with the desired mocked context as parameter.
   * @param mockContext an object representing the context to be mocked
   */
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
   * @example For the following call in your angular component:
   * `LuigiClient.linkManager().pathExists('pathToCheck')`
   *
   * // You need to call the following to mock pathExists() returning `true` for a given 'pathToCheck':
   * await mockPathExists('pathToCheck', true);
   *
   * // You need to call the following to mock pathExists() returning `false` for a given 'pathToCheck':
   * await mockPathExists('pathToCheck', false);
   *
   */
  mockPathExists = (path: string, exists: boolean) => {
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
  };

  /**
   * Checks on the printed DOM Luigi message responses for a modal with given title
   * having been opened. In such a case a message would be printed containing a modal.title.
   * Returns false if not such element was found.
   * @param title the title of the modal
   * @example
   * Format of the targeted message example:
   * {
   *   msg: 'luigi.navigation.open',
   *   sessionId: 0,
   *   params: {
   *     preserveView: true,
   *     nodeParams: { mode: 'modal' },
   *     errorSkipNavigation: false,
   *     fromContext: null,
   *     fromClosestContext: false,
   *     fromVirtualTreeRoot: false,
   *     fromParent: true,
   *     relative: true,
   *     link: 'templates',
   *     intent: false,
   *     modal: { title: 'Create Component from Template' } // element to check
   *   }
   * }
   *
   */
  async modalOpenedWithTitle(title: string): Promise<boolean> {
    // parse messages into a readable array
    await this.parseLuigiMockedMessages();

    // traverse the array and find the modal message response
    // check if its modal option has the title
    const indexFoundModalMessageWTitle = this.messages.findIndex(message => {
      const msgExists =
        message.msg &&
        message.msg === 'luigi.navigation.open' &&
        message.params &&
        message.params.modal &&
        message.params.modal.title;
      if (msgExists) {
        return message.params.modal.title === title;
      }
      return false;
    });
    if (indexFoundModalMessageWTitle >= 0) {
      return true;
    }
    console.debug('Could not find modal with title: ', title);
    return false;
  }

  /**
   * Return list of messages, representing message elements added in the DOM for testing.
   */
  getMSG() {
    return this.messages;
  }
}
