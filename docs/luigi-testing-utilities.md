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
This class contains certain utility helper functions needed when writing e2e tests with different test frameworks. You can simply import this module into you project and then use an instance of it to test micro frontend functionality.
Before version 2.9.0 this class could only be used for [protractor-based](https://www.npmjs.com/package/protractor) e2e tests.
Since version 2.9.0 this class supports both Cypress and Protractor.
Since version 2.14.0 this class supports also Nightwatch and WebdriverIO.

## How to use the library

**Prerequisites:**

_In order to use this utility library, you need to import LuigiMockModule into your Angular application's entry point - more details [here](https://docs.luigi-project.io/docs/framework-support-libraries/?section=luigicontextservice). You also have to install [Cypress](https://www.npmjs.com/package/cypress) or [Nightwatch](https://www.npmjs.com/package/nightwatch) or [WebdriverIO](https://www.npmjs.com/package/webdriverio) or [Protractor](https://www.npmjs.com/package/protractor) locally as a dev dependency for your project. Bear in mind Protractor is deprecated in Angular since version 15._


1. Import the library in the `package.json`:
```javascript
npm install @luigi-project/testing-utilities -s
```

2. Once the library is imported and saved in your Angular project, you can now import the module `LuigiMockUtil` into your test:
```javascript
import { LuigiMockUtil } from '@luigi-project/testing-utilities';
```

### Example how to use the library with Protractor

```javascript
import { browser } from 'protractor'; // <-- target e2e testing library
import { LuigiMockUtil } from '@luigi-project/testing-utilities';

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
import { LuigiMockUtil } from '@luigi-project/testing-utilities';

describe('Another test using cypress', () => {
  let luigiMockUtil: LuigiMockUtil;

  beforeEach(() => {
    // Necessary to execute the functions from LuigiMockUtil in Cypress context
    // and get the window object of the page that is currently active
    cy.window().then((win: any) => {
      luigiMockUtil = new LuigiMockUtil((fn: any) => {
        return new Promise((resolve, reject) => {
          resolve(fn());
        });
      }, win);
    });
    // Necessary that luigi-client sends postmessages to the same window
    // and not to parent (which is Cypress engine)
    cy.visit('http://localhost:4200', {
      onBeforeLoad: (win) => {
        win["parent"] = win;
      }
    });
  });

  it('should mock path exists', () => {
    // Be sure '.pathExists' element is present
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

  it('should mock context update', () => {
    const context = {ctxKey: 'ctxValue'};

    luigiMockUtil.mockContext(context);
    cy.get('#luigi-debug-vis-cnt').contains('{"msg":"luigi.get-context","context":{"ctxKey":"ctxValue"}}');
  });
});
```

### Example how to use the library with Nightwatch

```javascript
import { browser } from 'nightwatch'; // <-- target e2e testing library
import { LuigiMockUtil } from '@luigi-project/testing-utilities';

describe('Another test using nightwatch', function () {
  const luigiMockUtil: LuigiMockUtil = new LuigiMockUtil(browser);

  before((browser) => browser.navigateTo('http://localhost:4200'));

  it('should mock path exists', async () => {
    // Be sure '.pathExists' element is present
    await browser.expect.element('.pathExists').to.be.present;
    await browser.element('.pathExists').click().then(() => {
      luigiMockUtil.mockPathExists('/test', false);
      browser.execute(() => window.sessionStorage.getItem('luigiMockData'), [], function (result) {
        expect(result.value).to.contains('{"pathExists":{"/test":false}}');
      });
    });
  });

  it('should mock context update', async () => {
    const context = {ctxKey: 'ctxValue'};

    await luigiMockUtil.mockContext(context);
    // Wait until '#luigi-debug-vis-cnt' element is present
    await browser.waitForElementPresent('#luigi-debug-vis-cnt', undefined, undefined, false, () => {
      const wrapper = browser.expect.element('#luigi-debug-vis-cnt');

      wrapper.to.be.present;
      wrapper.text.to.contains('{"msg":"luigi.get-context","context":{"ctxKey":"ctxValue"}}');
    });
  });

  after((browser) => browser.end());
});
```

### Example how to use the library with WebdriverIO

```javascript
import { browser } from '@wdio/globals'; // <-- target e2e testing library
import { LuigiMockUtil } from '@luigi-project/testing-utilities';

describe('Another test using webdriverio', () => {
  const baseUrl = 'http://localhost:4200';
  const defaultTimeout = { 'implicit': 500 };
  let luigiMockUtil: LuigiMockUtil;

  it('should mock path exists', async () => {
    luigiMockUtil = new LuigiMockUtil(browser);

    await browser.url(baseUrl);
    // Be sure '.pathExists' element is present
    await $('.pathExists').click().then(() => {
        luigiMockUtil.mockPathExists('/test', false);
    });
    // Wait until session storage item is set
    await browser.setTimeout(defaultTimeout);

    const result = await browser.execute(() => window.sessionStorage.getItem('luigiMockData'));

    await expect(result).toEqual('{"pathExists":{"/test":false}}');
  });

  it('should mock context update', async () => {
    luigiMockUtil = new LuigiMockUtil(browser);

    const context = {ctxKey: 'ctxValue'};

    await browser.url(baseUrl);
    await luigiMockUtil.mockContext(context);
    // Wait until '#luigi-debug-vis-cnt' element is present
    await browser.setTimeout(defaultTimeout);
    await expect($('#luigi-debug-vis-cnt')).toHaveHTML(expect.stringContaining('{"msg":"luigi.get-context","context":{"ctxKey":"ctxValue"}}'));
  });
});
```

## Functions provided
- **mockContext**: Mocks the context by sending Luigi context messages with the desired mocked context as parameter.
- **mockPathExists**: This method serves as a mock for the Luigi Client `pathExists()` function. It is used in e2e tests when component being tested utilizes a call to `LuigiClient.linkManager().pathExists()`
- **modalOpenedWithTitle**: Checks on the printed DOM Luigi message responses for a modal with given title being opened. In such a case, a message would be printed containing a `modal.title`. Returns `false` if such element was not found.
- **getMSG**: Returns list of messages, representing message elements added in the DOM for testing.
- **parseLuigiMockedMessages**: Parses the elements added by LuigiMockModule into the DOM and assigns them to the local messages variable
