import { GenericHelpers } from '../utilities/helpers';
import { LuigiCoreAPIBase } from './baseClass';

export class linkManager extends LuigiCoreAPIBase {
  /**
   * @private
   */
  constructor(values) {
    // @param {object} values TODO: is it necessary at all, where is it used?
    super();
    Object.assign(this, values);

    this.options = {
      preserveView: false,
      nodeParams: {},
      errorSkipNavigation: false,
      fromContext: null,
      fromParent: false,
      fromClosestContext: false,
      relative: false,
      link: ''
    };
  }

  async navigate(path, preserveView, modalSettings, splitViewSettings, drawerSettings) {
    if (this.options.errorSkipNavigation) {
      this.options.errorSkipNavigation = false;
      return Promise.reject(new Error('navigation skipped'));
    }

    this.options.preserveView = preserveView;
    const relativePath = path[0] !== '/';

    if (path === '/' && (modalSettings || splitViewSettings || drawerSettings)) {
      console.warn('Navigation with an absolute path prevented.');
      return Promise.reject(new Error('Navigation with an absolute path prevented.'));
    }

    const remotePromise = GenericHelpers.createRemotePromise();

    const navigationOpenMsg = {
      msg: 'luigi.navigation.open',
      params: Object.assign(this.options, {
        link: path,
        relative: relativePath,
        modal: modalSettings,
        splitView: splitViewSettings,
        drawer: drawerSettings
      }),
      remotePromiseId: remotePromise.id
    };

    this.sendPostMessageToLuigiCore(navigationOpenMsg);
    return remotePromise;
  }

  /**
   * This function navigates to a modal after adding the onClosePromise that handles the callback for when the modal is closed.
   * @param {string} path the navigation path to open in the modal
   * @param {Object} modalSettings settings to configure the modal's title, size, width and height
   * @param {Function} onCloseCallback callback function called upon closing the opened modal
   */
  openAsModal(path, modalSettings = {}, onCloseCallback) {
    if (GenericHelpers.isFunction(onCloseCallback)) {
      const onClosePromise = GenericHelpers.createRemotePromise();
      onClosePromise.then(value => {
        onCloseCallback(value);
      });
      modalSettings.onClosePromiseId = onClosePromise.id;
    }
    return this.navigate(path, true, modalSettings);
  }

  openAsDrawer(path, drawerSettings = {}) {
    return this.navigate(path, true, undefined, undefined, drawerSettings);
  }

  openAsSplitView(path, splitViewSettings = {}) {
    this.navigate(path, true, undefined, splitViewSettings);
    return Luigi.splitView.splitViewHandle;
  }

  fromContext(navigationContext) {
    this.options.fromContext = navigationContext;
    return this;
  }

  fromClosestContext() {
    this.options.fromContext = null;
    this.options.fromClosestContext = true;
    this.options.fromParent = false;
    return this;
  }

  fromVirtualTreeRoot() {
    this.options.fromContext = null;
    this.options.fromClosestContext = false;
    this.options.fromVirtualTreeRoot = true;
    this.options.fromParent = false;
    return this;
  }

  fromParent() {
    this.options.fromContext = null;
    this.options.fromClosestContext = false;
    this.options.fromVirtualTreeRoot = false;
    this.options.fromParent = true;
    return this;
  }

  withParams(nodeParams) {
    if (nodeParams) {
      Object.assign(this.options.nodeParams, nodeParams);
    }
    return this;
  }

  pathExists(path) {
    if (GenericHelpers.isFunction(Luigi.pathExists)) {
      return Luigi.pathExists(path);
    } else {
      console.error(
        'Luigi.navigation().pathExists(path) is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
      );
    }
  }

  hasBack() {
    return Luigi.hasBack();
  }

  goBack(goBackValue) {
    this.sendPostMessageToLuigiCore({
      msg: 'luigi.navigation.back',
      goBackContext: goBackValue && JSON.stringify(goBackValue)
    });
  }

  /**
   * Retrieves the current route.
   * @returns The current route by invoking the buildPathForGetCurrentRoute method from App.svelte, which is assigned to the _app property of the Luigi object.
   */
  getCurrentRoute() {
    return Luigi._app.ctx[Luigi._app.props.buildPathForGetCurrentRoute](this.options);
  }

  sendPostMessageToLuigiCore(msg) {
    window.postMessage(msg, '*');
  }
}
