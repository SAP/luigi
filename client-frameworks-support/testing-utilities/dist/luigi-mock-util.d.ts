export declare class LuigiMockUtil {
  private messages;
  private browser;
  constructor(browser: any);
  /**
   * Parses the elements added by LuigiMockModule into the DOM and assigns them to the local this.messages variable
   */
  parseLuigiMockedMessages(): Promise<void>;
  /**
   * Mocks the context by sending luigi context messegaes with the desired mocked context as parameter.
   * @param mockContext an object representing the context to be mocked
   */
  mockContext: (mockContext: any) => void;
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
  mockPathExists: (path: string, exists: boolean) => void;
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
  modalOpenedWithTitle(title: string): Promise<boolean>;
  /**
   * Return list of messages, representing message elements added in the DOM for testing.
   */
  getMSG(): any[];
}
