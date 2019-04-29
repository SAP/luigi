const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const GenericHelpers = require('../../../src/utilities/helpers/generic-helpers');

describe('Generic-helpers', () => {
  let windowLocationImplementation;
  before(() => {
    windowLocationImplementation = window.location;
    delete window.location;
    window.location = {
      search: function () { return ''; }
    };
  });
  after(() => {
    window.location = windowLocationImplementation;
  });

  it('getUrlParameter', () => {
    const setLocationSearch = (url) => {
      sinon.stub(window.location, 'search').get(() => url);
    }
    const catName = 'spencer';

    setLocationSearch('?param=1&foo=bar&cat=' + catName);
    assert.equal(GenericHelpers.getUrlParameter('cat'), catName, 'url with ? and multiple params');

    setLocationSearch('#foo=bar&cat=' + catName + '&param=1');
    assert.equal(GenericHelpers.getUrlParameter('cat'), catName, 'url with # and multiple params');
  });
});
