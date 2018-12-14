const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const routing = require('../../src/services/routing');
import { afterEach } from 'mocha';
import { LuigiConfig } from '../../src/services/config';

describe('Routing', () => {
  let component;
  beforeEach(() => {
    let lastObj = {};
    component = {
      set: obj => {
        Object.assign(lastObj, obj);
      },
      get: () => lastObj
    };

    sinon.stub(LuigiConfig, 'getConfigValue');
  });
  afterEach(() => {
    if (document.createElement.restore) {
      document.createElement.restore();
    }
    sinon.restore();
  });

  describe('buildFromRelativePath', () => {
    beforeEach(() => {
      window.dispatchEvent = sinon.spy();
    });

    const nodeWithParent = {
      link: 'child-node',
      parent: {
        pathSegment: 'parent-node'
      }
    };

    it('should return proper route', () => {
      // given
      const expectedRoute = '/parent-node/child-node';
      LuigiConfig.getConfigValue.returns(true);

      // when
      window.location.hash = '/parent-node';
      const route = routing.buildFromRelativePath(nodeWithParent);

      // then
      assert.equal(route, expectedRoute);
    });

    it("should return proper route even if it's relative to a different node in the tree than the current one", () => {
      // given
      const expectedRoute = '/parent-node/child-node';
      LuigiConfig.getConfigValue.returns(true);

      // when
      window.location.hash = '/parent-node/different-node';
      const route = routing.buildFromRelativePath(nodeWithParent);

      // then
      assert.equal(route, expectedRoute);
    });
  });
});
