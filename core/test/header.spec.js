const headerService = require('../src/navigation/services/header');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('LogoTitle', function() {
  afterEach(() => {
    sinon.restore();
  });

  describe.only('processHeaderSettings()', function() {
    let component;
    const setHeaderSettings = headerSettings => {
      window.Luigi.config = {
        settings: {
          header: Object.assign({}, headerSettings)
        }
      };
    };

    beforeEach(() => {
      component = {
        set: sinon.spy()
      };
    });

    it('should not fail for undefined arguments', async () => {
      window.Luigi.config = {};
      await headerService.processHeaderSettings().then(
        () => {},
        () => {
          throw new Error('Error happened');
        }
      );
    });

    it('should resolve title', async () => {
      // given
      const headerSettings = {
        title: 'Luigi Demo'
      };
      setHeaderSettings(headerSettings);

      document.title = '';

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert.equal(document.title, headerSettings.title, 'document title');
      assert(
        component.set.calledWith({ title: headerSettings.title }),
        'component set() title'
      );
      assert(
        component.set.calledWith({ hasLogo: false }),
        'component set() hasLogo'
      );
    });

    it('should resolve logo', async () => {
      // given
      const headerSettings = {
        logo: 'data:image/svg+xml;base64,XXX='
      };
      setHeaderSettings(headerSettings);

      component.refs = {
        logo: {
          style: {
            backgroundImage: null
          }
        }
      };

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert.equal(
        component.refs.logo.style.backgroundImage,
        'url(' + headerSettings.logo + ')',
        'backgroundImage logo'
      );
      assert(
        component.set.calledOnceWith({ hasLogo: true }),
        'component set() hasLogo'
      );
    });

    it('should resolve favicon', async () => {
      // given
      const headerSettings = {
        favicon: '/assets/favicon.ico'
      };
      setHeaderSettings(headerSettings);

      sinon.stub(document, 'createElement').returns({});
      const appendChild = sinon.spy();
      sinon.stub(document, 'getElementsByTagName').returns([{ appendChild }]);

      const expectedLink = {
        type: 'image/x-icon',
        rel: 'shortcut icon',
        href: headerSettings.favicon
      };

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert(
        document.createElement.calledOnce,
        'document.createElement() call'
      );
      assert(
        document.getElementsByTagName.calledOnceWith('head'),
        'document.getElementsByTagName() call'
      );
      assert(appendChild.calledOnceWith(expectedLink), 'appendChild() call');
      assert(
        component.set.calledOnceWith({ hasLogo: false }),
        'component set() hasLogo'
      );
    });
  });
});
