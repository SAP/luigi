const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const EscapingHelpers = require('../../../src/utilities/helpers/escaping-helpers')
  .EscapingHelpers;

describe('Escaping-helpers', () => {
  it('sanitizeHtml', () => {
    const text = '&<>"\'';
    const sanitizedHtml = EscapingHelpers.sanitizeHtml(text);
    assert.equal(sanitizedHtml, '&amp;&lt;&gt;&quot;&#39;');

    const text2 = `This is text <img src="http://url.to.file.which/not.exist" onerror=alert(document.cookie); onclick=javascript:alert(document.cookie)><IMG SRC=j&#X41vascript:alert('test2')>`;
    const sanitizedHtml2 = EscapingHelpers.sanitizeHtml(text2);
    assert.equal(
      sanitizedHtml2,
      'This is text &lt;img src=&quot;http://url.to.file.which/not.exist&quot; onerror=alert(document.cookie); onclick=alert(document.cookie)&gt;&lt;IMG SRC=j&amp;#X41vascript:alert(&#39;test2&#39;)&gt;'
    );
  });

  it('sanitizeParam', () => {
    const param = '<>"\'/';
    const sanitizedParam = EscapingHelpers.sanitizeParam(param);
    assert.equal(sanitizedParam, '&lt;&gt;&quot;&#39;&sol;');
  });

  it('escapeKeyForRegexp', () => {
    const key = 'some/*/thing';
    const escapedRegexp = EscapingHelpers.escapeKeyForRegexp(key);
    assert.equal(escapedRegexp, 'some\\/\\*\\/thing');
  });

  describe('processTextAndLinks', () => {
    it('without links', () => {
      const text = `This is text <img src="http://url.to.file.which/not.exist" onerror=alert(document.cookie);><IMG SRC=j&#X41vascript:alert('test2')>`;
      const uniqueID = '1234567890';

      // when
      const escapedTextAndLinks = EscapingHelpers.processTextAndLinks(
        text,
        undefined,
        uniqueID
      );

      // then
      const expectedResult = {
        sanitizedText:
          'This is text &lt;img src=&quot;http://url.to.file.which/not.exist&quot; onerror=alert(document.cookie);&gt;&lt;IMG SRC=j&amp;#X41vascript:alert(&#39;test2&#39;)&gt;',
        links: []
      };

      assert.deepEqual(
        escapedTextAndLinks,
        expectedResult,
        'excaped text object with empty link array'
      );
    });

    it('with links', () => {
      const text = `Hello Luigi. {issues} {pulls}`;
      const links = {
        issues: {
          text: 'Issues',
          url: `http://github.com/SAP/luigi/issues`
        },
        pulls: {
          text: 'Pulls',
          url: `http://github.com/SAP/luigi/pulls`
        }
      };
      const uniqueID = '1234567890';

      sinon.stub(EscapingHelpers, 'sanitizeParam').callsFake(input => {
        return input;
      });
      sinon.stub(EscapingHelpers, 'escapeKeyForRegexp').callsFake(input => {
        return input;
      });
      sinon.stub(EscapingHelpers, 'sanitizeHtml').callsFake(input => {
        return input;
      });

      // when
      const escapedTextAndLinks = EscapingHelpers.processTextAndLinks(
        text,
        links,
        uniqueID
      );

      // then
      const expectedResult = {
        sanitizedText:
          'Hello Luigi. <a id="_luigi_alert_1234567890_link_issues">Issues</a> <a id="_luigi_alert_1234567890_link_pulls">Pulls</a>',
        links: [
          {
            elemId: '_luigi_alert_1234567890_link_issues',
            url: 'http://github.com/SAP/luigi/issues'
          },
          {
            elemId: '_luigi_alert_1234567890_link_pulls',
            url: 'http://github.com/SAP/luigi/pulls'
          }
        ]
      };

      assert.deepEqual(
        escapedTextAndLinks,
        expectedResult,
        'excaped text and links object'
      );
    });
  });
});
