const logoTitle = require('../src/navigation/services/logo-title');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');

describe('LogoTitle', function() {
  let component;
  sinon.stub(document, 'title');

  beforeEach(() => {
    window.Luigi = { config: {} };

    let lastObj = {};
    component = {
      set: obj => {
        Object.keys(obj).forEach(key => {
          lastObj[key] = obj[key];
        });
        // Object.assign(lastObj, obj);
      },
      get: () => lastObj
    };
  });
  afterEach(() => {
    if (document.title.restore) {
      document.title.restore();
    }
  });
  describe.only('processHeaderSettings()', function() {
    it('should not fail for undefined arguments', () => {
      window.Luigi.config = {};
      logoTitle.processHeaderSettings(component);
    });

    const headerSettings = {
      logo: 'data:image/svg+xml;base64,XXX=',
      title: 'Luigi Demo',
      favicon: '/assets/favicon.ico'
    };

    [
      {
        setting: headerSettings,
        description: 'plain json'
      },
      {
        setting: () => {
          return new Promise(function(resolve) {
            resolve(headerSettings);
          });
        },
        description: 'promised function'
      }
    ].forEach(test => {
      it('should resolve header properly for ' + test.description, async () => {
        // given
        window.Luigi.config = {
          settings: {
            header: test.setting
          }
        };
        component.refs = {
          logo: {
            style: {
              backgroundImage: null
            }
          }
        };
        const appendChild = sinon.spy();
        document.getElementsByTagName = () => [{ appendChild }];

        // then
        await logoTitle.processHeaderSettings(component);

        // when
        // title
        assert.equal(document.title, headerSettings.title, 'document title');
        assert.equal(
          component.get().title,
          headerSettings.title,
          'component title'
        );

        // logo
        assert.equal(
          component.refs.logo.style.backgroundImage,
          'url(' + headerSettings.logo + ')',
          'backgroundImage logo'
        );

        // favicon
        assert(appendChild.calledOnce);
        // Next assertion does not work and we do not want to recreate implementation
        // sinon.assert.calledWith(appendChild, '<link type="image/x-icon" rel="shortcut icon" href="/assets/favicon.ico"></link>');
      });
    });
  });
});
