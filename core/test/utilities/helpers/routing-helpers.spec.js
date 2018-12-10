const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { afterEach } from 'mocha';
import { LuigiConfig } from '../../../src/services/config';
import {
  getDefaultChildNode,
  isSameViewGroup,
  hasIframeIsolation
} from '../../../src/utilities/helpers/routing-helpers';

describe('Routing-helpers', () => {
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
  describe('defaultChildNodes', () => {
    const getPathData = function() {
      return {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'groups',
            children: [
              {
                pathSegment: 'stakeholders',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/stakeholders'
              },
              {
                pathSegment: 'customers',
                viewUrl: '/sampleapp.html#/projects/1/users/groups/customers'
              }
            ]
          }
        ],
        context: {}
      };
    };

    it('should return first child if no defaultChildNode is set', async () => {
      let pathData = getPathData();

      assert.equal(await getDefaultChildNode(pathData), 'stakeholders');
    });

    it('should return child with pathSegment equal to defaultChildNode', async () => {
      let pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'customers';

      assert.equal(await getDefaultChildNode(pathData), 'customers');
    });

    it('should return first child if given defaultChildNode does not exist', async () => {
      const pathData = getPathData();
      pathData.navigationPath[1].defaultChildNode = 'NOSUCHPATH';

      assert.equal(await getDefaultChildNode(pathData), 'stakeholders');
    });

    it('should return first child asynchronous if no defaultChildNode is set', async () => {
      let pathData = {
        navigationPath: [
          {
            // DOESN'T MATTER
          },
          {
            pathSegment: 'groups',
            children: () =>
              Promise.resolve([
                {
                  pathSegment: 'stakeholders',
                  viewUrl:
                    '/sampleapp.html#/projects/1/users/groups/stakeholders'
                },
                {
                  pathSegment: 'customers',
                  viewUrl: '/sampleapp.html#/projects/1/users/groups/customers'
                }
              ])
          }
        ],
        context: {}
      };

      assert.equal(await getDefaultChildNode(pathData), 'stakeholders');
    });
  });
  describe('isSameViewGroup', () => {
    const config = {
      iframe: {
        src: 'http://url.com/app.html!#/prevUrl'
      }
    };

    it('should return true if views have the same domain and different hash', () => {
      component.set({
        viewUrl: 'http://url.com/app.html!#/someUrl',
        previousNodeValues: { viewUrl: config.iframe.src }
      });
      assert.isTrue(isSameViewGroup(config, component));
    });

    it('should return false if views have different domains', () => {
      component.set({
        viewUrl: 'http://otherurl.de/app.html!#/someUrl',
        previousNodeValues: { viewUrl: config.iframe.src }
      });
      assert.isFalse(isSameViewGroup(config, component));
    });

    const noHashConfig = {
      iframe: {
        src: 'http://url.com/oneSite'
      }
    };

    it('should return true if views have the same domain and viewGroup', () => {
      component.set({
        viewUrl: 'http://url.com/SomeUrl',
        viewGroup: 'firstSPA',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src,
          viewGroup: 'firstSPA'
        }
      });
      assert.isTrue(isSameViewGroup(config, component));
    });

    it('should return false if views have the same domian and different viewGroups', () => {
      component.set({
        viewUrl: 'http://url.com/someUrl',
        viewGroup: 'firstSPA',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src,
          viewGroup: 'secondSPA'
        }
      });
      assert.isFalse(isSameViewGroup(config, component));
    });

    it('should return false if views have the same domain and no viewGroup defined', () => {
      component.set({
        viewUrl: 'http://url.com/someUrl',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src
        }
      });
      assert.isFalse(isSameViewGroup(config, component));
    });

    it('should return false if views have different domains and the same viewGroup', () => {
      component.set({
        viewUrl: 'http://otherDomain.com/someUrl',
        viewGroup: 'firstSPA',
        previousNodeValues: {
          viewUrl: noHashConfig.iframe.src,
          viewGroup: 'firstSPA'
        }
      });
      assert.isFalse(isSameViewGroup(config, component));
    });
  });

  it('hasIframeIsolation', () => {
    // no node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: false }
    });
    assert.isFalse(hasIframeIsolation(component));

    // new node is set to isolateView
    component.set({
      isolateView: true,
      previousNodeValues: { isolateView: false }
    });
    assert.isTrue(hasIframeIsolation(component));

    // current node is set to isolateView
    component.set({
      isolateView: false,
      previousNodeValues: { isolateView: true }
    });
    assert.isTrue(hasIframeIsolation(component));
  });
});
