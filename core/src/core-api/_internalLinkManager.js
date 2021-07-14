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
      fromClosestContext: false,
      relative: false,
      link: ''
    };
  }

  navigate(path, preserveView, modalSettings, splitViewSettings, drawerSettings) {
    if (this.options.errorSkipNavigation) {
      this.options.errorSkipNavigation = false;
      return;
    }

    this.options.preserveView = preserveView;
    const relativePath = path[0] !== '/';

    if (path === '/') {
      console.warn('Navigation with an absolute path prevented.');
      return;
    }

    const navigationOpenMsg = {
      msg: 'luigi.navigation.open',
      params: Object.assign(this.options, {
        link: path,
        relative: relativePath,
        modal: modalSettings,
        splitView: splitViewSettings,
        drawer: drawerSettings
      })
    };

    this.sendPostMessageToLuigiCore(navigationOpenMsg);
  }

  openAsModal(path, modalSettings = {}) {
    this.navigate(path, true, modalSettings);
  }

  openAsDrawer(path, drawerSettings = {}) {
    this.navigate(path, true, undefined, undefined, drawerSettings);
  }

  fromContext(navigationContext) {
    this.options.fromContext = navigationContext;
    return this;
  }

  fromClosestContext() {
    this.options.fromContext = null;
    this.options.fromClosestContext = true;
    return this;
  }

  fromVirtualTreeRoot() {
    this.options.fromContext = null;
    this.options.fromClosestContext = false;
    this.options.fromVirtualTreeRoot = true;
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

  sendPostMessageToLuigiCore(msg) {
    window.postMessage(msg, '*');
  }
}
