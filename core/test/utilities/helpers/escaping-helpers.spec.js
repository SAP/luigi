const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const EscapingHelpers = require('../../../src/utilities/helpers/escaping-helpers');

describe('Iframe-helpers', () => {
  it('sanitizeHtml', () => {
    const text = '&<>"\'';
    const sanitizedHtml = EscapingHelpers.sanitizeHtml(text);
    assert.equal(sanitizedHtml, '&amp;&lt;&gt;&quot;&#39;');
  });

  it('sanitizeParam', () => {
    const param = '<>"\'/';
    const sanitizedParam = EscapingHelpers.sanitizeParam(param);
    assert.equal(sanitizedParam, '&lt;&gt;&quot;&#39;&sol;');
  });

  it('escapeRegExp', () => {
    const regex = '/*/';
    const escapedRegexp = EscapingHelpers.escapeRegExp(regex);
    assert.equal(escapedRegexp, '\\/\\*\\/');
  });
});
