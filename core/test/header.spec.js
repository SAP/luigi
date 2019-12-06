const headerService = require('../src/navigation/services/header');
const assert = require('chai').assert;
const sinon = require('sinon');

describe('Header', function() {
  describe('processHeaderSettings', function() {
    let clock;
    let component;
    const setHeaderSettings = headerSettings => {
      window.Luigi.config = {
        settings: {
          header: Object.assign({}, headerSettings)
        }
      };
    };

    const addToConfig = addition => {
      window.Luigi.config = { ...window.Luigi.config, ...addition };
    };

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      let componentData = {};
      component = {
        get: () => componentData,
        set: o => {
          componentData = { ...componentData, ...o };
        },
        store: {
          on: (e, cb) => {},
          get: () => {},
          subscribe: fn => fn(),
          subscribeToScope: () => {}
        }
      };
      sinon.spy(component, 'set');
    });

    afterEach(() => {
      clock.restore();
      sinon.restore();
    });

    it('should not fail for undefined arguments', async () => {
      window.Luigi.config = {};
      await headerService.processHeaderSettings(component);
    });

    it('should resolve title and subtitle', async () => {
      // given
      const headerSettings = {
        title: 'Luigi Demo',
        subTitle: 'good stuff'
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
        component.set.calledWith({ defaultTitle: headerSettings.title }),
        'component set() defaultTitle'
      );
      assert(
        component.set.calledWith({ subTitle: headerSettings.subTitle }),
        'component set() subTitle'
      );
      assert(
        component.set.calledWith({ defaultSubTitle: headerSettings.subTitle }),
        'component set() defaultSubTitle'
      );
    });

    it('should hide logo if not defined', async () => {
      setHeaderSettings({});

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert(
        component.set.calledWith({ hasLogo: false }),
        'component set() hasLogo false'
      );
    });

    it('should resolve logo and set hasLogo', async () => {
      // given
      const headerSettings = {
        logo: 'data:image/svg+xml;base64,XXX='
      };
      setHeaderSettings(headerSettings);

      component.set({
        logo: {
          style: {
            backgroundImage: null
          }
        },
        logo2: {
          style: {
            backgroundImage: null
          }
        }
      });

      // when
      await headerService.processHeaderSettings(component);

      clock.tick(100);

      // then
      assert(
        component.set.calledWith({ hasLogo: true }),
        'component set() hasLogo'
      );
      assert.equal(
        component.get().logo.src,
        headerSettings.logo,
        'header logo'
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
      sinon
        .stub(document, 'getElementsByTagName')
        .returns([{ appendChild, childNodes: [] }]);

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
    });

    it('should resolve favicon with childNodes', async () => {
      // given
      const headerSettings = {
        favicon: '/assets/favicon.ico'
      };
      setHeaderSettings(headerSettings);

      const appendChild = sinon.spy();
      const remove = sinon.spy();
      const childNodes = [
        {
          rel: 'shortcut icon',
          remove
        },
        {
          rel: 'shortcut icon',
          remove
        }
      ];

      sinon
        .stub(document, 'getElementsByTagName')
        .returns([{ appendChild, childNodes, remove }]);

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert(remove.calledTwice, 'remove() call');
    });

    it('should have no app switcher if no apps configured', async () => {
      setHeaderSettings({});

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert(
        component.set.calledWith({ hasApps: undefined }),
        'component set() hasApps false'
      );
    });

    it('should have app switcher if showMainAppEntry is true', async () => {
      setHeaderSettings({});
      addToConfig({
        navigation: {
          appSwitcher: {
            showMainAppEntry: true
          }
        }
      });

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert(
        component.set.calledWith({ hasApps: true }),
        'component set() hasApps true'
      );
      assert(
        component.set.calledWith({ showMainAppEntry: true }),
        'component set() showMainAppEntry true'
      );
    });

    it('should have app switcher if apps are configured', async () => {
      const items = [
        {
          title: 'app1',
          subTitle: 'application one',
          link: '/apps/app1'
        },
        {
          title: 'app2',
          subTitle: 'application two',
          link: '/apps/app2'
        }
      ];
      setHeaderSettings({});
      addToConfig({
        navigation: {
          appSwitcher: {
            items
          }
        }
      });

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert(
        component.set.calledWith({ hasApps: true }),
        'component set() hasApps true'
      );
      assert(
        component.set.calledWith({ showMainAppEntry: undefined }),
        'component set() showMainAppEntry false'
      );
      assert(
        component.set.calledWith({ appSwitcherItems: items }),
        'component set() appSwitcherItems item'
      );
    });

    it('should have app switcher if apps and are showMainAppEntry are configured', async () => {
      const items = [
        {
          title: 'app1',
          subTitle: 'application one',
          link: '/apps/app1'
        },
        {
          title: 'app2',
          subTitle: 'application two',
          link: '/apps/app2'
        }
      ];
      setHeaderSettings({});
      addToConfig({
        navigation: {
          appSwitcher: {
            showMainAppEntry: true,
            items
          }
        }
      });

      // when
      await headerService.processHeaderSettings(component);

      // then
      assert(
        component.set.calledWith({ hasApps: true }),
        'component set() hasApps true'
      );
      assert(
        component.set.calledWith({ showMainAppEntry: true }),
        'component set() showMainAppEntry true'
      );
      assert(
        component.set.calledWith({ appSwitcherItems: items }),
        'component set() appSwitcherItems item'
      );
    });
  });

  describe('updateTitle', () => {
    let component;
    const setHeaderSettings = headerSettings => {
      window.Luigi.config = {
        settings: {
          header: Object.assign({}, headerSettings)
        }
      };
    };

    beforeEach(() => {
      let componentData = {};
      component = {
        get: () => componentData,
        set: o => {
          componentData = { ...componentData, ...o };
        },
        store: {
          on: (e, cb) => {},
          get: () => {},
          subscribe: fn => fn(),
          subscribeToScope: () => {}
        }
      };
      sinon.spy(component, 'set');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should not fail if title is not defined', () => {
      const headerSettings = {
        subTitle: 'Title is not defined'
      };
      setHeaderSettings(headerSettings);
      assert.equal(window.Luigi.config.settings.header.title, undefined);

      document.title = '';
      component.set({
        defaultTitle: window.Luigi.config.settings.header.title
      });

      headerService.updateTitle(component);
      assert.equal(document.title, '');
    });

    it('should not fail if title is empty string', () => {
      const headerSettings = {
        title: '',
        subTitle: 'Title is empty'
      };
      setHeaderSettings(headerSettings);

      document.title = '';

      component.set({
        defaultTitle: window.Luigi.config.settings.header.title
      });

      headerService.updateTitle(component);
      assert.equal(document.title, '');
    });

    it('update title if subTitle is not defined', () => {
      const headerSettings = {
        title: 'SubTitle is not defined'
      };
      setHeaderSettings(headerSettings);
      assert.equal(window.Luigi.config.settings.header.subTitle, undefined);
      document.title = '';

      component.set({
        defaultTitle: window.Luigi.config.settings.header.title
      });

      headerService.updateTitle(component);
      assert.equal(document.title, 'SubTitle is not defined');
    });

    it('update title and subTitle', () => {
      assert.equal(window.Luigi.config.settings.header.subTitle, undefined);

      const headerSettings = {
        title: 'Luigi with subTitle',
        subTitle: 'here'
      };
      setHeaderSettings(headerSettings);

      document.title = '';

      component.set({
        defaultTitle: window.Luigi.config.settings.header.title
      });
      component.set({
        defaultSubTitle: window.Luigi.config.settings.header.subTitle
      });

      headerService.updateTitle(component);
      assert.equal(document.title, 'Luigi with subTitle');
      assert.equal(window.Luigi.config.settings.header.subTitle, 'here');
    });

    it('set appSwitcherItems, update title', () => {
      const headerSettings = {
        title: 'Luigi',
        subTitle: 'one'
      };
      setHeaderSettings(headerSettings);

      document.title = '';
      const items = [
        {
          title: 'Luigi One',
          subTitle: 'project one',
          link: '/projects/pr1'
        },
        {
          title: 'Luigi Two',
          subTitle: 'project two',
          link: '/projects/pr2'
        }
      ];
      const pathData = [
        {
          pathSegment: 'home',
          children: [{ pathSegment: 'overview' }, { pathSegment: 'projects' }]
        },
        {
          pathSegment: 'projects',
          children: [
            {
              pathSegment: 'pr1'
            }
          ]
        },
        {
          pathSegment: 'pr2'
        }
      ];

      component.set({
        appSwitcherItems: items
      });
      component.set({
        pathData: pathData
      });
      headerService.updateTitle(component);
      assert.equal(document.title, 'Luigi Two');
    });
  });
});
