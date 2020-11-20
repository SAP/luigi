const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;

import { WebComponentService } from '../../src/services/web-components';
import { LuigiConfig } from '../../src/core-api';
import { DefaultCompoundRenderer } from '../../src/utilities/helpers/web-component-helpers';
import { LuigiElement } from '../../../client/src/luigi-element';
import { fail } from 'sinon/lib/sinon/mock-expectation';

describe('WebComponentService', function() {
  describe('generate web component id', function() {
    const someRandomString =
      'dsfgljhbakjdfngb,mdcn vkjrzwero78to4     wfoasb    f,asndbf';

    it('check determinism', () => {
      let wcId = WebComponentService.generateWCId(someRandomString);
      let wcId2 = WebComponentService.generateWCId(someRandomString);
      expect(wcId).to.equal(wcId2);
    });

    it('check uniqueness', () => {
      let wcId = WebComponentService.generateWCId(someRandomString);
      let wcId2 = WebComponentService.generateWCId(
        'someOtherRandomString_9843utieuhfgiasdf'
      );
      expect(wcId).to.not.equal(wcId2);
    });
  });

  describe('attach web component', function() {
    const sb = sinon.createSandbox();
    let container;
    let itemPlaceholder;
    const ctx = { someValue: true };

    before(() => {
      window.Luigi = {
        navigation: 'mock1',
        ux: 'mock2'
      };
    });

    afterEach(() => {
      sb.restore();
    });

    beforeEach(() => {
      container = document.createElement('div');
      itemPlaceholder = document.createElement('div');
    });

    it('check dom injection abort if container not attached', () => {
      WebComponentService.attachWC('div', itemPlaceholder, container, ctx);

      expect(container.children.length).to.equal(0);
    });

    it('check dom injection', () => {
      container.appendChild(itemPlaceholder);
      WebComponentService.attachWC('div', itemPlaceholder, container, ctx);

      const expectedCmp = container.children[0];
      expect(expectedCmp.context).to.equal(ctx);
      expect(expectedCmp.LuigiClient.linkManager).to.equal(
        window.Luigi.navigation
      );
      expect(expectedCmp.LuigiClient.uxManager).to.equal(window.Luigi.ux);
      expect(expectedCmp.LuigiClient.publishEvent).to.be.a('function');
    });

    it('check post-processing', () => {
      const wc_id = 'my-wc';
      var MyLuigiElement = class extends LuigiElement {
        render(ctx) {
          return '<div></div>';
        }
      };

      var myEl = Object.create(MyLuigiElement.prototype, {});
      sb.stub(myEl, '__postProcess').callsFake(() => {});
      sb.stub(document, 'createElement')
        .callThrough()
        .withArgs('my-wc')
        .callsFake(() => {
          return myEl;
        });
      sb.stub(container, 'replaceChild').callsFake(() => {});

      container.appendChild(itemPlaceholder);
      WebComponentService.attachWC(
        wc_id,
        itemPlaceholder,
        container,
        ctx,
        'http://localhost:8080/'
      );

      assert(myEl.__postProcess.calledOnce, '__postProcess should be called');
    });
  });

  describe('register web component from url', function() {
    const sb = sinon.createSandbox();

    afterEach(() => {
      sb.restore();
    });

    it('check resolve', done => {
      let definedId;
      sb.stub(WebComponentService, 'dynamicImport').returns(
        new Promise((resolve, reject) => {
          resolve({ default: {} });
        })
      );
      window.customElements = {
        define: (id, clazz) => {
          definedId = id;
        },
        get: id => {
          return undefined;
        }
      };

      WebComponentService.registerWCFromUrl('url', 'id').then(() => {
        expect(definedId).to.equal('id');
        done();
      });
    });

    it('check reject', done => {
      let definedId;
      sb.stub(WebComponentService, 'dynamicImport').returns(
        new Promise((resolve, reject) => {
          reject({ default: {} });
        })
      );
      window.customElements = {
        define: (id, clazz) => {
          definedId = id;
        }
      };

      WebComponentService.registerWCFromUrl('url', 'id')
        .then(() => {
          assert(false, 'should not be here');
          done();
        })
        .catch(err => {
          expect(definedId).to.be.undefined;
          done();
        });
    });

    it('check reject due to not-allowed url', done => {
      WebComponentService.registerWCFromUrl(
        'http://luigi-project.io/mfe.js',
        'id'
      )
        .then(() => {
          assert(false, 'should not be here');
          done();
        })
        .catch(err => {
          done();
        });
    });
  });

  describe('render web component', function() {
    const container = document.createElement('div');
    const ctx = { someValue: true };
    const viewUrl = 'someurl';
    const sb = sinon.createSandbox();
    const node = {};

    before(() => {
      window.Luigi = { mario: 'luigi', luigi: window.luigi };
    });

    after(() => {
      window.Luigi = window.Luigi.luigi;
    });

    beforeEach(() => {
      sb.stub(WebComponentService, 'dynamicImport').returns(
        new Promise((resolve, reject) => {
          resolve({ default: {} });
        })
      );
    });

    afterEach(() => {
      sb.restore();
      delete window.luigiWCFn;
    });

    it('check attachment of already existing wc', done => {
      window.customElements = {
        define: (id, clazz) => {
          definedId = id;
        },
        get: () => {
          return true;
        }
      };

      sb.stub(WebComponentService, 'registerWCFromUrl').callsFake(() => {
        assert(false, 'should not be here');
      });

      sb.stub(WebComponentService, 'attachWC').callsFake(
        (id, iCnt, cnt, context) => {
          expect(cnt).to.equal(container);
          expect(context).to.equal(ctx);
          done();
        }
      );

      WebComponentService.renderWebComponent(viewUrl, container, ctx, node);
    });

    it('check invocation of custom function', done => {
      let definedId;

      window.customElements = {
        define: (id, clazz) => {
          definedId = id;
        },
        get: () => {
          return false;
        }
      };

      sb.stub(WebComponentService, 'registerWCFromUrl').callsFake(() => {
        assert(false, 'should not be here');
      });

      sb.stub(WebComponentService, 'attachWC').callsFake(
        (id, iCnt, cnt, context) => {
          expect(cnt).to.equal(container);
          expect(context).to.equal(ctx);
          done();
        }
      );

      window.luigiWCFn = (viewUrl, wc_id, wc_container, cb) => {
        cb();
      };

      WebComponentService.renderWebComponent(viewUrl, container, ctx, node);
    });

    it('check creation and attachment of new wc', done => {
      let definedId;

      window.customElements = {
        define: (id, clazz) => {
          definedId = id;
        },
        get: () => {
          return false;
        }
      };

      sb.stub(WebComponentService, 'registerWCFromUrl').callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve();
        });
      });

      sb.stub(WebComponentService, 'attachWC').callsFake(
        (id, iCnt, cnt, context) => {
          expect(cnt).to.equal(container);
          expect(context).to.equal(ctx);
          done();
        }
      );

      WebComponentService.renderWebComponent(viewUrl, container, ctx, node);
    });
  });

  describe('check valid wc url', function() {
    const sb = sinon.createSandbox();

    afterEach(() => {
      sb.restore();
    });

    it('check permission for relative and absolute urls from same domain', () => {
      let relative1 = WebComponentService.checkWCUrl('/folder/sth.js');
      expect(relative1).to.be.true;
      let relative2 = WebComponentService.checkWCUrl('folder/sth.js');
      expect(relative2).to.be.true;
      let relative3 = WebComponentService.checkWCUrl('./folder/sth.js');
      expect(relative3).to.be.true;

      let absolute = WebComponentService.checkWCUrl(
        window.location.href + '/folder/sth.js'
      );
      expect(absolute).to.be.true;
    });

    it('check permission and denial for urls based on config', () => {
      sb.stub(LuigiConfig, 'getConfigValue').returns([
        'https://fiddle.luigi-project.io/.?',
        'https://docs.luigi-project.io/.?'
      ]);

      let valid1 = WebComponentService.checkWCUrl(
        'https://fiddle.luigi-project.io/folder/sth.js'
      );
      expect(valid1).to.be.true;
      let valid2 = WebComponentService.checkWCUrl(
        'https://docs.luigi-project.io/folder/sth.js'
      );
      expect(valid2).to.be.true;

      let invalid1 = WebComponentService.checkWCUrl(
        'http://fiddle.luigi-project.io/folder/sth.js'
      );
      expect(invalid1).to.be.false;
      let invalid2 = WebComponentService.checkWCUrl(
        'https://slack.luigi-project.io/folder/sth.js'
      );
      expect(invalid2).to.be.false;
    });
  });

  describe('check includeSelfRegisteredWCFromUrl', function() {
    const sb = sinon.createSandbox();
    const node = {
      webcomponent: {
        selfRegistered: true
      }
    };

    before(() => {
      window.Luigi = { mario: 'luigi', luigi: window.luigi };
    });

    after(() => {
      window.Luigi = window.Luigi.luigi;
    });

    afterEach(() => {
      sb.restore();
    });

    it('check if script tag is added', () => {
      let element;
      sb.stub(document.body, 'appendChild').callsFake(el => {
        element = el;
      });

      WebComponentService.includeSelfRegisteredWCFromUrl(
        node,
        '/mfe.js',
        () => {}
      );
      expect(element.getAttribute('src')).to.equal('/mfe.js');
    });

    it('check if script tag is not added for untrusted url', () => {
      sb.spy(document.body, 'appendChild');
      WebComponentService.includeSelfRegisteredWCFromUrl(
        node,
        'https://luigi-project.io/mfe.js',
        () => {}
      );
      assert(document.body.appendChild.notCalled);
    });
  });

  describe('check createCompoundContainerAsync', function() {
    const sb = sinon.createSandbox();

    afterEach(() => {
      sb.restore();
    });

    it('check compound container created', done => {
      let renderer = new DefaultCompoundRenderer();
      sb.spy(renderer);
      WebComponentService.createCompoundContainerAsync(renderer).then(
        () => {
          assert(
            renderer.createCompoundContainer.calledOnce,
            'createCompoundContainer called once'
          );
          done();
        },
        e => {
          assert(false, 'should not be here');
          done();
        }
      );
    });

    it('check nesting mfe created', done => {
      let renderer = new DefaultCompoundRenderer();
      renderer.viewUrl = 'mfe.js';
      sb.stub(WebComponentService, 'registerWCFromUrl').resolves();
      sb.spy(renderer);
      WebComponentService.createCompoundContainerAsync(renderer).then(
        () => {
          assert(
            renderer.createCompoundContainer.notCalled,
            'createCompoundContainer should not be called'
          );
          assert(
            WebComponentService.registerWCFromUrl.calledOnce,
            'registerWCFromUrl called once'
          );
          done();
        },
        e => {
          assert(false, 'should not be here');
          done();
        }
      );
    });
  });

  describe('check renderWebComponentCompound', function() {
    const sb = sinon.createSandbox();

    const context = { key: 'value', mario: 'luigi' };

    const eventEmitter = 'emitterId';
    const eventName = 'emitterId';

    const navNode = {
      compound: {
        eventListeners: [
          {
            source: '*',
            name: eventName,
            action: 'update',
            dataConverter: data => {
              return 'new text: ' + data;
            }
          }
        ],
        children: [
          {
            viewUrl: 'mfe1.js',
            context: {
              title: 'My Awesome Grid'
            },
            layoutConfig: {
              row: '1',
              column: '1 / -1'
            },
            eventListeners: [
              {
                source: eventEmitter,
                name: eventName,
                action: 'update',
                dataConverter: data => {
                  return 'new text: ' + data;
                }
              }
            ]
          },
          {
            id: eventEmitter,
            viewUrl: 'mfe2.js',
            context: {
              title: 'Some input',
              instant: true
            }
          }
        ]
      }
    };

    before(() => {
      window.Luigi = { mario: 'luigi', luigi: window.luigi };
    });

    after(() => {
      window.Luigi = window.Luigi.luigi;
    });

    afterEach(() => {
      sb.restore();
    });

    it('render flat compound', done => {
      const wc_container = document.createElement('div');

      sb.spy(WebComponentService, 'renderWebComponent');
      sb.stub(WebComponentService, 'registerWCFromUrl').resolves();

      WebComponentService.renderWebComponentCompound(
        navNode,
        wc_container,
        context
      )
        .then(compoundCnt => {
          expect(wc_container.children.length).to.equal(1);

          // eventbus test
          let evBus = compoundCnt.eventBus;
          const listeners = evBus.listeners[eventEmitter + '.' + eventName];
          expect(listeners.length).to.equal(1);
          const target = compoundCnt.querySelector(
            '[nodeId=' + listeners[0].wcElementId + ']'
          );
          sb.spy(target, 'dispatchEvent');
          evBus.onPublishEvent(new CustomEvent(eventName), eventEmitter);
          assert(target.dispatchEvent.calledOnce);

          // Check if renderWebComponent is called for each child
          assert(WebComponentService.renderWebComponent.calledTwice);

          done();
        })
        .catch(() => {
          fail();
          done();
        });
    });

    it('render nested compound', done => {
      const wc_container = document.createElement('div');
      const compoundCnt = document.createElement('div');
      const node = JSON.parse(JSON.stringify(navNode));
      node.viewUrl = 'mfe.js';
      node.webcomponent = true;
      window.customElements = {
        get: () => {
          return false;
        }
      };

      sb.stub(WebComponentService, 'registerWCFromUrl').resolves();

      WebComponentService.renderWebComponentCompound(
        node,
        wc_container,
        context
      ).then(
        compoundCnt => {
          expect(WebComponentService.registerWCFromUrl.callCount).to.equal(3);

          // eventbus test
          let evBus = compoundCnt.eventBus;
          sb.spy(compoundCnt, 'dispatchEvent');
          evBus.onPublishEvent(new CustomEvent(eventName), eventEmitter);
          assert(compoundCnt.dispatchEvent.calledOnce);

          done();
        },
        () => {
          assert(false, 'should not be here');
          done();
        }
      );
    });
  });
});
