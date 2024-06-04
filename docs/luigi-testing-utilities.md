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
Since version 2.9.0 this class contains certain utility helper functions needed when writing e2e tests with Cypress or Protractor. You can simply import this module into you project and then use an instance of it to test micro frontend functionality.
Before version 2.9.0 this class could only be used for [protractor-based](https://www.npmjs.com/package/protractor) e2e tests.

## How to use the library

**Prerequisites:**

_In order to use this utility library, you need to import LuigiMockModule into your Angular application's entry point. See more [here](https://docs.luigi-project.io/docs/framework-support-libraries/?section=luigicontextservice). You also have to install [Cypress](https://www.npmjs.com/package/cypress) or [Protractor](https://www.npmjs.com/package/protractor) locally as a dev dependency for your project. Bear in mind Protractor is deprecated in Angular since version 15._


1. Import the library in the `package.json`:
```javascript
npm install @luigi-project/testing-utilities -s
```

2. Once the library is imported and saved in your Angular project, you can now import the module `LuigiMockUtil` into your test:
```javascript
import { LuigiMockUtil } from "@luigi-project/testing-utilities";
```

### Example how to use the library with Protractor

```javascript
import { browser } from 'protractor'; // <-- target e2e testing library
import { LuigiMockUtil } from "@luigi-project/testing-utilities";

describe('Another test using protractor', () => {
  let luigiMockUtil: LuigiMockUtil;

  beforeAll(async () => {
    luigiMockUtil = new LuigiMockUtil(browser);
  });

  it('should load the page if correct luigi context provided', async () => {
    await luigiMockUtil.mockContext({
      someData: '1',
      someOtherData: 'randomInfo',
    });
  });
});
```

### Example how to use the library with Cypress

```javascript
describe('Another test using cypress', () => {
  let luigiMockUtil: LuigiMockUtil;

  beforeAll(async () => {
    // Necessary to execute the functions from LuigiMockUtil in cypress context and get the
    // the window object of the page that is currently active
    cy.window().then((win: any) => {
      luigiMockUtil = new LuigiMockUtil((fn: any) => {
        return new Promise((resolve, reject) => {
          resolve(fn());
        })
      }, win);
    });
    //Necessary that luigi-client sends postmessages to the same window and not to parent (which is cypress engine)
    cy.visit('http://localhost:4200', {
      onBeforeLoad: (win) => {
        win["parent"] = win;
      }
    });
  });

  it('Mock path exists', () => {
    cy.get('.pathExists').click().then(() => {
      luigiMockUtil.mockPathExists('/test', false);
    });
    cy.getAllSessionStorage().then((result: any) => {
      expect(result).to.deep.equal({
        "http://localhost:4200": {
          luigiMockData: '{"pathExists":{"/test":false}}'
        },
      });
    })
  });

  it('mock context update', () => {
    let context = {
      ctxKey: 'ctxValue'
    }
    luigiMockUtil.mockContext(context);
    cy.get('#luigi-debug-vis-cnt').contains('{"msg":"luigi.get-context","context":{"ctxKey":"ctxValue"}}');
  });
});
```

## Functions provided
- **mockContext**: Mocks the context by sending Luigi context messages with the desired mocked context as parameter. 
- **mockPathExists**: This method serves as a mock for the Luigi Client `pathExists()` function. It is used in e2e tests when component being tested utilizes a call to `LuigiClient.linkManager().pathExists()`
- **modalOpenedWithTitle**: Checks on the printed DOM Luigi message responses for a modal with given title being opened. In such a case, a message would be printed containing a `modal.title`. Returns `false` if such element was not found.
- **getMSG**: Returns list of messages, representing message elements added in the DOM for testing. 
- **parseLuigiMockedMessages**: Parses the elements added by LuigiMockModule into the DOM and assigns them to the local messages variable
