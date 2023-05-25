<!-- meta
{
  "node": {
    "label": "Luigi Testing Utilities",
    "category": {
      "label": "Luigi Client",
      "collapsible": true
    },
    "metaData": {
      "categoryPosition": 5,
      "position": 2
    }
  }
}
meta -->



# Luigi Testing Utilities

The [Luigi Testing Utilities](https://github.com/SAP/luigi/tree/main/client-frameworks-support/testing-utilities) are a set of auxiliary functions used to enhance the user experience while testing Luigi-based micro frontends. The functions abstract away Luigi-specific logic from the tester so that it is easier for them to mock and assert Luigi functionality. 

## LuigiMockUtil 
This class contains certain utility helper functions needed when writing [protractor-based](https://www.npmjs.com/package/protractor) e2e tests. You can simply import this module into you project and then use an instance of it to test micro frontend functionality. 

## How to use the library

**Prerequisites:**

_In order to use this utility library, you need to import LuigiMockModule into your Angular application's entry point. See more [here](https://docs.luigi-project.io/docs/framework-support-libraries/?section=luigicontextservice)._


1. Import the library in the `package.json`:
```javascript
npm install @luigi-project/testing-utilities -s
```

2. Once the library is imported and saved in your Angular project, you can now import the module `LuigiMockUtil` into your test:
```javascript
import { LuigiMockUtil } from "@luigi-project/testing-utilities";
```

### Example

```javascript
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
}
```

## Functions provided
- **mockContext**: Mocks the context by sending Luigi context messages with the desired mocked context as parameter. 
- **mockPathExists**: This method serves as a mock for the Luigi Client `pathExists()` function. It is used in e2e tests when component being tested utilizes a call to `LuigiClient.linkManager().pathExists()`
- **modalOpenedWithTitle**: Checks on the printed DOM Luigi message responses for a modal with given title being opened. In such a case, a message would be printed containing a `modal.title`. Returns `false` if such element was not found.
- **getMSG**: Returns list of messages, representing message elements added in the DOM for testing. 
- **parseLuigiMockedMessages**: Parses the elements added by LuigiMockModule into the DOM and assigns them to the local messages variable
