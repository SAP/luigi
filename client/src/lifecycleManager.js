import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';
import { linkManager } from './linkManager';
/**
 * Use the functions and parameters to define the Lifecycle of listeners, navigation nodes, and Event data.
 * @name Lifecycle
 */
class LifecycleManager extends LuigiClientBase {
  /** @private */
  constructor() {
    super();
    this.luigiInitialized = false;
    this.defaultContextKeys = [
      'context',
      'internal',
      'nodeParams',
      'pathParams'
    ];
    this.setCurrentContext(
      this.defaultContextKeys.reduce(function(acc, key) {
        acc[key] = {};
        return acc;
      }, {})
    );

    this._onContextUpdatedFns = {};
    this._onInactiveFns = {};
    this._onInitFns = {};
    this.authData = {};
    
    /**
     * Virtual Tree Nav related vars
     * @private
     */
    this._navigationSyncDefaults = {
      active: true,
      useHashRouting: false,
      useClosestContext: false,
      localBasePath: null
    }
    this.navigationSync = {};
    this.originalHistory = {};
    /**
     * Adds event listener for communication with Luigi Core and starts communication
     * @private
     */
    const luigiClientInit = () => {
      /**
       * Save context data every time navigation to a different node happens
       * @private
       */
      const setContext = rawData => {
        for (let index = 0; index < this.defaultContextKeys.length; index++) {
          let key = this.defaultContextKeys[index];
          try {
            if (typeof rawData[key] === 'string') {
              rawData[key] = JSON.parse(rawData[key]);
            }
          } catch (e) {
            console.info(
              'unable to parse luigi context data for',
              key,
              rawData[key],
              e
            );
          }
        }
        this.setCurrentContext(rawData);
      };

      const setAuthData = eventPayload => {
        if (eventPayload) {
          this.authData = eventPayload;
        }
      };

      helpers.addEventListener('luigi.init', e => {
        setContext(e.data);
        setAuthData(e.data.authData);
        helpers.setLuigiCoreDomain(e.origin);
        this.luigiInitialized = true;
        this._notifyInit(e.origin);
      });

      helpers.addEventListener('luigi-client.inactive-microfrontend', e => {
        this._notifyInactive(e.origin);
      });

      helpers.addEventListener('luigi.auth.tokenIssued', e => {
        setAuthData(e.data.authData);
      });

      helpers.addEventListener('luigi.navigate', e => {
        setContext(e.data);
        if (!this.currentContext.internal.isNavigateBack && !this.navigationSync.active) {
          history.replaceState(null, '', e.data.viewUrl);
          window.dispatchEvent(
            new PopStateEvent('popstate', { state: 'luiginavigation' })
          );
        }
        // execute the context change listener if set by the micro frontend
        this._notifyUpdate();
        helpers.sendPostMessageToLuigiCore({ msg: 'luigi.navigate.ok' });
      });
      /**
       * Get context once initially
       * @private
       */
      window.parent.postMessage(
        {
          msg: 'luigi.get-context'
        },
        '*'
      );
      this._tpcCheck();
      this._initNavigationSync();
    };

    luigiClientInit();
  }

  _tpcCheck() {
    let tpc = 'enabled';
    let cookies = document.cookie;
    let luigiCookie;
    let luigiCookieKey;
    if (cookies) {
      luigiCookie = cookies
        .split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie == 'luigiCookie=true');
    }
    if (luigiCookie === 'luigiCookie=true') {
      luigiCookieKey = luigiCookie.split('=')[0];
      document.cookie = luigiCookieKey + '=; Max-Age=-99999999;';
    }
    document.cookie = 'luigiCookie=true';
    cookies = document.cookie;
    if (cookies) {
      luigiCookie = cookies
        .split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie == 'luigiCookie=true');
    }
    if (luigiCookie === 'luigiCookie=true') {
      window.parent.postMessage({ msg: 'luigi.third-party-cookie', tpc }, '*');
      document.cookie = luigiCookieKey + '=; Max-Age=-99999999;';
    } else {
      tpc = 'disabled';
      window.parent.postMessage({ msg: 'luigi.third-party-cookie', tpc }, '*');
      console.warn('Third party cookies are not supported!');
    }
  }

  /**
   * Iterates over an object and executes all top-level functions
   * with a given payload.
   * @private
   * @memberof Lifecycle
   */
  _callAllFns(objWithFns, payload, origin) {
    for (let id in objWithFns) {
      if (objWithFns.hasOwnProperty(id) && helpers.isFunction(objWithFns[id])) {
        objWithFns[id](payload, origin);
      }
    }
  }

  /**
   * Notifies all context init listeners.
   * @private
   * @memberof Lifecycle
   */
  _notifyInit(origin) {
    this._callAllFns(this._onInitFns, this.currentContext.context, origin);
  }

  /**
   * Notifies all context update listeners.
   * @private
   * @memberof Lifecycle
   */
  _notifyUpdate() {
    this._callAllFns(this._onContextUpdatedFns, this.currentContext.context);
  }

  /**
   * Notifies all inactive listeners.
   * @private
   * @memberof Lifecycle
   */
  _notifyInactive() {
    this._callAllFns(this._onInactiveFns);
  }

  /**
   * @private
   * @memberof Lifecycle
   */
  setCurrentContext(value) {
    this.currentContext = value;
  }

  /**
   * Registers a listener called with the context object and the Luigi Core domain as soon as Luigi is instantiated. Defer your application bootstrap if you depend on authentication data coming from Luigi.
   * @param {Lifecycle~initListenerCallback} initFn the function that is called once Luigi is initialized, receives current context and origin as parameters.
   * @memberof Lifecycle
   */
  addInitListener(initFn) {
    const id = helpers.getRandomId();
    this._onInitFns[id] = initFn;
    if (this.luigiInitialized && helpers.isFunction(initFn)) {
      initFn(this.currentContext.context, helpers.getLuigiCoreDomain());
    }
    return id;
  }

  /**
   * Callback of the addInitListener
   * @callback Lifecycle~initListenerCallback
   * @param {Object} context current context data
   * @param {string} origin Luigi Core URL
   */
  /**
   * Removes an init listener.
   * @param {string} id the id that was returned by the `addInitListener` function
   * @memberof Lifecycle
   */
  removeInitListener(id) {
    if (this._onInitFns[id]) {
      this._onInitFns[id] = undefined;
      return true;
    }
    return false;
  }

  /**
   * Registers a listener called with the context object upon any navigation change.
   * @param {function} contextUpdatedFn the listener function called each time Luigi context changes
   * @memberof Lifecycle
   */
  addContextUpdateListener(contextUpdatedFn) {
    const id = helpers.getRandomId();
    this._onContextUpdatedFns[id] = contextUpdatedFn;
    if (this.luigiInitialized && helpers.isFunction(contextUpdatedFn)) {
      contextUpdatedFn(this.currentContext.context);
    }
    return id;
  }

  /**
   * Removes a context update listener.
   * @param {string} id the id that was returned by the `addContextUpdateListener` function
   * @memberof Lifecycle
   */
  removeContextUpdateListener(id) {
    if (this._onContextUpdatedFns[id]) {
      this._onContextUpdatedFns[id] = undefined;
      return true;
    }
    return false;
  }

  /**
   * Registers a listener called upon micro frontend inactivity. This happens when a new micro frontend gets shown while keeping the old one cached.
   * Gets called when:
   * - navigating with **preserveView**
   * - navigating from or to a **viewGroup**
   *
   * Does not get called when navigating normally, or when `openAsModal` or `openAsSplitView` are used.
   * @param {function} inactiveFn the listener function called each time a micro frontend turns into an inactive state
   * @memberof Lifecycle
   */
  addInactiveListener(inactiveFn) {
    const id = helpers.getRandomId();
    this._onInactiveFns[id] = inactiveFn;
    return id;
  }

  /**
   * Removes a listener for inactive micro frontends.
   * @param {string} id the id that was returned by the `addInactiveListener` function
   * @memberof Lifecycle
   */
  removeInactiveListener(id) {
    if (this._onInactiveFns[id]) {
      this._onInactiveFns[id] = undefined;
      return true;
    }
    return false;
  }

  /**
   * Registers a listener called when the micro frontend receives a custom message.
   * @param {string} customMessageId the custom message id
   * @param {Lifecycle~customMessageListenerCallback} customMessageListener the function that is called when the micro frontend receives the corresponding event.
   * @memberof Lifecycle
   * @since 0.6.2
   */
  addCustomMessageListener(customMessageId, customMessageListener) {
    return helpers.addEventListener(
      customMessageId,
      (customMessage, listenerId) => {
        return customMessageListener(customMessage, listenerId);
      }
    );
  }

  /**
   * Callback of the customMessageListener
   * @callback Lifecycle~customMessageListenerCallback
   * @param {Object} customMessage custom message object
   * @param {string} customMessage.id message id
   * @param {*} customMessage.MY_DATA_FIELD any other message data field
   * @param {string} listenerId custom message listener id to be used for unsubscription
   */
  /**
   * Removes a custom message listener.
   * @param {string} id the id that was returned by the `addInitListener` function
   * @memberof Lifecycle
   * @since 0.6.2
   */
  removeCustomMessageListener(id) {
    return helpers.removeEventListener(id);
  }

  /**
   * Returns the currently valid access token.
   * @returns {string} current access token
   * @memberof Lifecycle
   */
  getToken() {
    return this.authData.accessToken;
  }

  /**
   * Returns the context object. Typically it is not required as the {@link #addContextUpdateListener addContextUpdateListener()} receives the same values.
   * @returns {Object} current context data
   * @memberof Lifecycle
   */
  getEventData() {
    return this.currentContext.context;
  }
  /**
   * Returns the context object. It is an alias function for getEventData().
   * @returns {Object} current context data
   * @memberof Lifecycle
   */
  getContext() {
    return this.getEventData();
  }
  /**
   * Returns the node parameters of the active URL.
   * Node parameters are defined like URL query parameters but with a specific prefix allowing Luigi to pass them to the micro frontend view. The default prefix is **~** and you can use it in the following way: `https://my.luigi.app/home/products?~sort=asc~page=3`.
   * <!-- add-attribute:class:warning -->
   * > **NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in node parameters are HTML-encoded.
   * @returns {Object} node parameters, where the object property name is the node parameter name without the prefix, and its value is the value of the node parameter. For example `{sort: 'asc', page: 3}`
   * @memberof Lifecycle
   */
  getNodeParams() {
    return this.currentContext.nodeParams;
  }
  /**
   * Returns the dynamic path parameters of the active URL.
   * Path parameters are defined by navigation nodes with a dynamic **pathSegment** value starting with **:**, such as **productId**.
   * All path parameters in the current navigation path (as defined by the active URL) are returned.
   * <!-- add-attribute:class:warning -->
   * > **NOTE:** some special characters (`<`, `>`, `"`, `'`, `/`) in path parameters are HTML-encoded.
   * @returns {Object} path parameters, where the object property name is the path parameter name without the prefix, and its value is the actual value of the path parameter. For example ` {productId: 1234, ...}`
   * @memberof Lifecycle
   */
  getPathParams() {
    return this.currentContext.pathParams;
  }

  /**
   * Returns the current client permissions as specified in the navigation node or an empty object. For details, see [Node parameters](navigation-parameters-reference.md).
   * @returns {Object} client permissions as specified in the navigation node.
   * @memberof Lifecycle
   */
  getClientPermissions() {
    return this.currentContext.internal.clientPermissions || {};
  }

  /**
   * When the micro frontend is not embedded in the Luigi Core application and there is no init handshake you can set the target origin that is used in postMessage function calls by Luigi Client.
   * @param {string} origin target origin.
   * @memberof Lifecycle
   * @since 0.7.3
   */
  setTargetOrigin(origin) {
    helpers.setTargetOrigin(origin);
  }

  /**
   * Sends a custom message to the Luigi Core application.
   * @param {Object} message an object containing data to be sent to the Luigi Core to process it further. This object is set as an input parameter of the custom message listener on the Luigi Core side.
   * @param {string} message.id a string containing the message id
   * @param {*} message.MY_DATA_FIELD any other message data field
   * @example
   * import LuigiClient from '@kyma-project/luigi-client';
   * LuigiClient.sendCustomMessage({id: 'environment.created', production: false})
   * @memberof Lifecycle
   * @since 0.6.2
   */
  sendCustomMessage(message) {
    const customMessageInternal = helpers.convertCustomMessageUserToInternal(
      message
    );
    helpers.sendPostMessageToLuigiCore(customMessageInternal);
  }
  
  /**
   * Configures automatic routing synchronization
   * Allows the use of a micro frontend router as main navigation strategy, which implicitely updates the Luigi Core URL.
   * Mostly used in combination with **virtualTree** node configuration, which allows to simply drop-in a micro-frontend under a specified navigation tree.
   * // TODO: skipEvaluation: true 
   * @param {Object} config Configuration object
   * @param {string} [config.active=true] enables or disables routing synchronization
   * @param {string} [config.useHashRouting=false] defines the configured routing strategy of the micro frontend. If not set, path routing is assumed.
   * @param {string} [config.useClosestContext=false] when set to true, **fromClosestContext()** will be used. Set **navigationContext** at the node where virtualTree is defined and enable this value.
   * @param {string} [config.localBasePath] defines 
   * @returns {Promise} gets resolved when congigVirtualTreeNav got applied and can be used. This is required since the configuration needs to wait for the successful client initialization
   * @example
   * import LuigiClient from '@kyma-project/luigi-client';
   * LuigiClient.lifecycleManager().setNavigationSync({ useHashRouting: false, useClosestContext: true });
   * LuigiClient.lifecycleManager().setNavigationSync({ active: true, useHashRouting: false, useClosestContext: true });
   * Disable:
   * LuigiClient.lifecycleManager().setNavigationSync({active: false});
   * @memberof Lifecycle
   * @since 0.7.4
   */
  setNavigationSync(config) {
    this.navigationSync = Object.assign({}, this._navigationSyncDefaults, config);
  }

  /**
   * @private
   * @since 0.7.4
   */
  _initNavigationSync() {
    if(this._navigationSyncInitalized) {
      return;
    }

    this._navigationSyncInitalized = true;
    this.addInitListener(() => {
      const linkManagerInstance = new linkManager({
        currentContext: this.currentContext
      });
      const navigateTo = function(rawPath) {
        let path = rawPath.startsWith('#') ? rawPath.slice(1) : rawPath;

        if (this.navigationSync.localBasePath && path.startsWith(this.navigationSync.localBasePath)) {
          path = path.replace(this.navigationSync.localBasePath, '');
        }

        if(this.navigationSync.useClosestContext) {
          linkManagerInstance.withoutSync().fromClosestContext().navigate(path);
        } else {
          linkManagerInstance.withoutSync().navigate(path);        
        }
      }.bind(this);

      if (this.navigationSync.listenerId) {
        helpers.removeEventListener(this.navigationSync.listenerId);
      }
      const isNavigationSyncActive = () => {
        return this.navigationSync.active;
      }

      if (this.navigationSync.active) {
        const routingEventName = this.navigationSync.useHashRouting ? 'hashchange' : 'popstate';
        const isHashRouting = routingEventName === 'hashchange';
        this.navigationSync.listenerId = helpers.addEventListener(routingEventName, (e) => {
          console.log('url change', e);
        });
        this.navigationSync.listenerId = helpers.addEventListener('popstate', (e) => {
          console.log('url popstate', e);
        });

        // monkeypatch history api to listen to router changes
        ["pushState", "replaceState"].map(type => {
          // keep a "real" original history api in the reference, it is required if 
          // setNavigationSync is called multiple times
          const original = this.originalHistory[type] || history[type];
          this.originalHistory[type] = original;

          history[type] = function() {
            const result = original.apply(this, arguments);
            const event = new Event(type);
            event.arguments = arguments;

            if(isNavigationSyncActive()) {
              console.log('isNavigationSyncActive');
              if(isHashRouting) {
                const hash = arguments[2];
                console.log('update prarent hash route to', hash, event.arguments);
                navigateTo(hash);
              } else {
                navigateTo(arguments[1]); // TODO: Check validity
              }
            }

            dispatchEvent(event);
            return result;
          };
        });
      }
    })
  }
}
export const lifecycleManager = new LifecycleManager();
