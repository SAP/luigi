export declare class LuigiMockUtil {
  private messages;
  private browser;
  constructor(browser: any);
  parseLuigiMockedMessages(): Promise<void>;
  mockContext: (mockContext: any) => void;
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
  mockPathExists(path: string, exists: boolean): void;
  getMSG(): any[];
}
