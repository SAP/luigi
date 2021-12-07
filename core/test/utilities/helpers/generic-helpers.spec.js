const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
import { LuigiConfig } from '../../../src/core-api';
import { GenericHelpers } from '../../../src/utilities/helpers';

describe('Generic-helpers', () => {
  let windowLocationImplementation;
  before(() => {
    windowLocationImplementation = window.location;
    delete window.location;
    window.location = {
      search: function() {
        return '';
      }
    };
  });
  after(() => {
    window.location = windowLocationImplementation;
  });

  it('getUrlParameter', () => {
    const setLocationSearch = url => {
      sinon.stub(window.location, 'search').get(() => url);
    };
    const catName = 'spencer';

    setLocationSearch('?param=1&foo=bar&cat=' + catName);
    assert.equal(GenericHelpers.getUrlParameter('cat'), catName, 'url with ? and multiple params');

    setLocationSearch('#foo=bar&cat=' + catName + '&param=1');
    assert.equal(GenericHelpers.getUrlParameter('cat'), catName, 'url with # and multiple params');
  });

  it('getUrlWithoutHash', () => {
    const url = 'http://luigi.url.de/#hashsomething';
    const withoutHash = GenericHelpers.getUrlWithoutHash(url);
    assert.equal(withoutHash, 'http://luigi.url.de/');
  });

  it('hasHash', () => {
    const path = '#luigi/tets/something';
    const includingHash = GenericHelpers.hasHash(path);
    assert.isTrue(includingHash);
  });

  it('getPathWithoutHash', () => {
    const path = '#/tets';
    assert.equal(GenericHelpers.getPathWithoutHash(path), 'tets');
  });

  it('addLeadingSlash', () => {
    assert.equal(GenericHelpers.addLeadingSlash('luigi'), '/luigi');
  });

  it('trimLeadingSlash', () => {
    assert.equal(GenericHelpers.trimLeadingSlash('/luigi'), 'luigi');
  });

  it('removeInternalProperties', () => {
    const input = {
      some: true,
      value: true,
      _internal: true,
      _somefn: () => true
    };
    const expected = {
      some: true,
      value: true
    };
    assert.deepEqual(GenericHelpers.removeInternalProperties(input), expected);
  });
  it('removeProperties', () => {
    const input = {
      some: true,
      value: true,
      _internal: true,
      _somefn: () => true,
      internalOne: true,
      internalTwo: true
    };
    const keys = ['_*', 'value', 'internal*'];
    const expected = {
      some: true
    };
    assert.deepEqual(GenericHelpers.removeProperties(input, keys), expected);
  });

  describe('semverCompare', () => {
    it('standard versions', () => {
      const input = ['1.1.1', '0.6.4', '0.7.7', '0.7.1', '1.0.0'];
      const expected = ['0.6.4', '0.7.1', '0.7.7', '1.0.0', '1.1.1'];
      assert.deepEqual(input.sort(GenericHelpers.semverCompare), expected);
    });

    it('with beta and next', () => {
      const input = ['1.1.1-dev.0000', '0.6.4', '0.7.7-beta.0', '0.7.1', '1.0.0'];
      const expected = ['0.6.4', '0.7.1', '0.7.7-beta.0', '1.0.0', '1.1.1-dev.0000'];
      assert.deepEqual(input.sort(GenericHelpers.semverCompare), expected);
    });

    it('single comparison', () => {
      assert.equal(GenericHelpers.semverCompare('0.7.4', '1.1.1'), -1);
      assert.equal(GenericHelpers.semverCompare('1.1.1', '0.7.4'), 1);
    });
  });
  describe('request experimental feature', () => {
    beforeEach(() => {
      sinon.stub(LuigiConfig, 'getConfig');
      console.warn = sinon.spy();
      LuigiConfig.getConfig.returns({
        settings: {
          experimental: {
            test: true
          }
        }
      });
    });
    afterEach(() => {
      sinon.restore();
    });
    it('experimental feature is configured', () => {
      assert.equal(GenericHelpers.requestExperimentalFeature('test', true), true);
    });
    it('experimental feature NOT configured and show console warn', () => {
      assert.equal(GenericHelpers.requestExperimentalFeature('tets', true), false);
      sinon.assert.calledOnce(console.warn);
    });
    it('experimental feature NOT configured and no console warn', () => {
      assert.equal(GenericHelpers.requestExperimentalFeature('tets', false), false);
      sinon.assert.neverCalledWith(console.warn);
    });
  });
});
