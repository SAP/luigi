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

  it('escapeRegExp', () => {
    const regex = '/*/';
    const escapedRegexp = EscapingHelpers.escapeRegExp(regex);
    assert.equal(escapedRegexp, '\\/\\*\\/');
  });

  it('processTextAndLinks', () => {
    const text = `This is text <img src="http://url.to.file.which/not.exist" onerror=alert(document.cookie);><IMG SRC=j&#X41vascript:alert('test2')>`;
    const links = {
      ok: {
        text: 'Some Linktext',
        url: `javascript:alert('Wufff1!')`
      },
      works: {
        text: 'Linktext',
        url: `javascript:alert('Wufff2!')`
      }
    };
    const uniqueID = '1234567890';

    sinon.stub(EscapingHelpers, 'sanitizeHtml').callsFake(input => {
      switch (input) {
        case text:
          return 'This is text &lt;img src=&quot;http://url.to.file.which/not.exist&quot; onerror=alert(document.cookie);&gt;&lt;IMG SRC=j&amp;#X41vascript:alert(&#39;test2&#39;)&gt;';
          break;
        case links.ok.url:
          return 'alert(&#39;Wufff1!&#39;)';
          break;
        case links.works.url:
          return 'alert(&#39;Wufff2!&#39;)';
          break;
        default:
          return 'WRONG';
          break;
      }
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
        'This is text &lt;img src=&quot;http://url.to.file.which/not.exist&quot; onerror=alert(document.cookie);&gt;&lt;IMG SRC=j&amp;#X41vascript:alert(&#39;test2&#39;)&gt;',
      links: [
        {
          elemId: '_luigi_alert_1234567890_link_ok',
          url: 'alert(&#39;Wufff1!&#39;)'
        },
        {
          elemId: '_luigi_alert_1234567890_link_works',
          url: 'alert(&#39;Wufff2!&#39;)'
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
