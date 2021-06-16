## Luigi Testing Utilities

Luigi Testing Utilities is a set of auxiliary functions used to enhance the user experience while testing Luigi based microfrontends. The functions abstract away Luigi specific logic from the tester so that it is easier for them to test. 

### LuigiMockUtil 
This class contains certain utility helper functions needed especially in e2e-testing with [protractor](https://www.npmjs.com/package/protractor). You can simply import this module into you project and then use an instance of it to test microfrontend functionality. 

#### Example Usage

```
import { browser } from 'protractor'; // <-- target e2e testing library
import { LuigiMockUtil } from "@luigi-project/testing-utilities";

describe('Another test', () => {
  let luigiMockUtil: LuigiMockUtil;

  beforeAll(async () => {
    luigiMockUtil = new LuigiMockUtil(browser);
  });

  it('should load the page if correct luigi context provided', async () => {
    await luigiMockUtil.mockContext({
      someData: '1',
      someOtherData: 'randomInfo',
    });
  }
```

#### Functions provided
- _mockContext_: Mocks the context by sending luigi context messegaes with the desired mocked context as parameter. 
- _mockPathExists_: This method serves as a mock for the luigi client pathExists() function. It is used in e2e tests when component being tested utilizes a call to `LuigiClient.linkManager().pathExists()`
- _modalOpenedWithTitle_: Checks on the printed DOM Luigi message responses for a modal with given title having been opened. In such a case a message would be printed containing a modal.title. Returns false if not such element was found.
- _getMSG_: Return list of messages, representing message elements added in the DOM for testing. 
- _parseLuigiMockedMessages_: Parses the elements added by LuigiMockModule into the DOM and assigns them to the local messages variable