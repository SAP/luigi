const chai = require('chai');
const assert = chai.assert;
const GenericHelpers = require('../../../src/utilities/helpers/generic-helpers');

describe('Generic-helpers', () => {
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
});
