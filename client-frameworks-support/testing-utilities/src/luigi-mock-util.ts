export class LuigiMockUtil {
  private sessionStorageItemName = 'luigiMockData';
  private visualizationContainerId = 'luigi-debug-vis-cnt';
  private messages: any[];
  private browser: any;
  private win: any;

  constructor(browser: any, win?: any) {
    this.messages = [];
    this.browser = browser;
    this.win = win;
  }

  /**
   * Parses the elements added by LuigiMockModule into the DOM and assigns them to the local this.messages variable
   *  @returns {Promise<void>} - A Promise that resolves when parsing is complete.
   */
  async parseLuigiMockedMessages(): Promise<void> {
    const window = this.getGlobalThis();
    const getTextNodeValues = (): any[] => {
      const debugCtn = window.getElementById(this.visualizationContainerId);

      return Array.from(debugCtn?.childNodes || []).map((item: any) => item.textContent || '');
    };
    let textElements: string[];

    try {
      switch (true) {
        case 'evaluate' in this.browser:
          this.browser.evaluate(getTextNodeValues);
          break;
        case 'execute' in this.browser:
          this.browser.execute(getTextNodeValues);
          break;
        case 'executeScript' in this.browser:
          this.browser.executeScript(getTextNodeValues);
          break;
        default:
          this.browser(getTextNodeValues);
          break;
      }

      this.messages = textElements
        .map((item: string) => {
          try {
            return JSON.parse(item);
          } catch (error) {
            return undefined;
          }
        })
        .filter(item => item !== undefined);
    } catch (error) {
      console.debug('Failed to parse luigi mocked messages: ', error);
    }
  }

  /**
   * Mocks the context by sending luigi context messages with the desired mocked context as parameter.
   * @param mockContext an object representing the context to be mocked
   */
  mockContext(mockContext: Record<string, any>): void {
    const window = this.getGlobalThis();
    const postMessageToLuigi = (context: Record<string, any>): Record<string, any> => {
      window.postMessage({ msg: 'luigi.get-context', context }, '*');

      return { ...context, windowMessage: 'isPosted' };
    };

    try {
      switch (true) {
        case 'evaluate' in this.browser:
          this.browser.evaluate(postMessageToLuigi, mockContext);
          break;
        case 'execute' in this.browser:
          this.browser.execute(postMessageToLuigi, mockContext);
          break;
        case 'executeScript' in this.browser:
          this.browser.executeScript(postMessageToLuigi, mockContext);
          break;
        default:
          this.browser(postMessageToLuigi.bind(this, mockContext));
          break;
      }
    } catch (error) {
      console.debug('Failed to mock context: ', error);
    }
  }

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
  mockPathExists(path: string, exists: boolean): void {
    const window = this.getGlobalThis();
    const mockContext: Record<string, boolean | string> = { path, exists };
    /**
     * Sets the path exists mock data in sessionStorage.
     * @param {string} path - The path for which mock data is to be set.
     * @param {boolean} exists - Boolean indicating whether the path exists.
     * @returns {Object} - Object indicating session storage item.
     */
    const setPathExistsMockData = (context: Record<string, boolean | string>): Record<string, any> => {
      window.sessionStorage.clear();

      const pathExistsMockData: Record<string, any> = {
        pathExists: {
          [context['path'] as string]: context['exists']
        }
      };

      window.sessionStorage.setItem(this.sessionStorageItemName, JSON.stringify(pathExistsMockData));

      return { ...pathExistsMockData, sessionItem: 'isStored' };
    };

    try {
      switch (true) {
        case 'evaluate' in this.browser:
          this.browser.evaluate(setPathExistsMockData, mockContext);
          break;
        case 'execute' in this.browser:
          this.browser.execute(setPathExistsMockData, mockContext);
          break;
        case 'executeScript' in this.browser:
          this.browser.executeScript(setPathExistsMockData, mockContext);
          break;
        default:
          this.browser(setPathExistsMockData.bind(this, mockContext));
          break;
      }
    } catch (error) {
      console.debug('Failed to mock path exists: ', error);
    }
  }

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
   * Returns output of 'mockContext' method with given data.
   * @param {Object} context - Object representing the context to be mocked.
   * @returns {string} - Stringified output of 'mockContext' method.
   */
  getMockedContextOutput(context: Record<string, any>): string {
    return `{"msg":"luigi.get-context","context":${JSON.stringify(context)}}`;
  }

  /**
   * Returns output of 'mockPathExists' method with given arguments.
   * @param {string} path - The path for which mock data is to be set.
   * @param {boolean} exists - Boolean indicating whether the path exists.
   * @returns {string} - Stringified output of 'mockPathExists' method.
   */
  getMockedPathExistsOutput(path: string, exists: boolean): string {
    return JSON.stringify({ [this.sessionStorageItemName]: { pathExists: { [path]: exists } } }).slice(1, -1);
  }

  /**
   * Returns parsed session storage data used for testing.
   * @param {Object} data - Object or string representing the data to be cleaned.
   * @returns {string} - Stringified session storage data.
   */
  getCleanSessionStorageData(data: any): string {
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    return JSON.stringify(data)
      .replace(/\\/g, '')
      .replace(/"{/g, '{')
      .replace(/}"/g, '}');
  }

  /**
   * Returns ID of Luigi visualization container added in the DOM for testing.
   * @returns {string} - ID of Luigi visualization container.
   */
  getVisualizationContainerId(): string {
    return this.visualizationContainerId;
  }

  /**
   * Returns list of messages, representing message elements added in the DOM for testing.
   * @returns {Array} - Array of message elements.
   */
  getMSG(): any[] {
    return this.messages;
  }

  /**
   * Returns the global window object.
   * @returns the global win object
   */
  private getGlobalThis(): any {
    return this.win || globalThis;
  }
}
