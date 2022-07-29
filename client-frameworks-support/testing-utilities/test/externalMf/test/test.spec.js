//import { LuigiMockEngine } from '../node_modules/@luigi-project/testing-utilities/luigi-mock-engine.js';
import { LuigiClient } from '../node_modules/@luigi-project/client/luigi-client.js';
//import mockUtils from '../node_modules/@luigi-project/testing-utilities/luigi-mock-util.js';

const chai = require('chai');
//const { LuigiMockUtil } = mockUtils;
const assert = chai.assert;

describe('Luigi mock env', function() {
  //const luigiMockEngine = new LuigiMockEngine();
  //const luigiMocKUtil = new LuigiMockUtil();

  describe('Check if client, engine and utils are present', () => {
    it('Should initialize LuigiClient', async () => {
      assert.isDefined(LuigiClient);
    });

    it('Should initialize LuigiMockEngine', async () => {
      assert.isObject(luigiMockEngine);
    });

    it('Should initialize LuigiMockUtils', async () => {
      assert.isObject(luigiMockEngine);
    });
  });
});
