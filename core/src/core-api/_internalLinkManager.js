import { GenericHelpers } from '../utilities/helpers';
/**
 * @private
 * @abstract
 */
export class LuigiClientBase {
  /**
   * @private
   */
  constructor() {
    this.promises = {};
  }
  /**
   * Returns the promises object
   * @private
   */
  setPromise(name, value) {
    this.promises[name] = value;
  }
  /**
   * Sets the promises object
   * @private
   */
  getPromise(name) {
    return this.promises[name];
  }
}

export class linkManager extends LuigiClientBase {
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

  navigate(path, preserveView, modalSettings) {
    if (this.options.errorSkipNavigation) {
      this.options.errorSkipNavigation = false;
      return;
    }

    this.options.preserveView = preserveView;
    const relativePath = path[0] !== '/';
    const navigationOpenMsg = {
      msg: 'luigi.navigation.open',
      params: Object.assign(this.options, {
        link: path,
        relative: relativePath,
        modal: modalSettings
      })
    };

    this.sendPostMessageToLuigiCore(navigationOpenMsg);
  }

  openAsModal(path, modalSettings = {}) {
    this.navigate(path, true, modalSettings);
  }

  fromContext(navigationContext) {
    //TODO fix currentContext
    // const navigationContextInParent =
    //     this.currentContext.context.parentNavigationContexts.indexOf(
    //         navigationContext
    //     ) !== -1;
    // if (navigationContextInParent) {
    //     this.options.fromContext = navigationContext;
    // } else {
    //     this.options.errorSkipNavigation = true;
    //     console.error(
    //         'Navigation not possible, navigationContext ' +
    //         navigationContext +
    //         ' not found.'
    //     );
    // }
    this.options.fromContext = navigationContext;
    return this;
  }

  fromClosestContext() {
    //TODO
    // const hasParentNavigationContext =
    //     this.currentContext.context.parentNavigationContexts.length > 0;
    // if (hasParentNavigationContext) {
    //     this.options.fromContext = null;
    //     this.options.fromClosestContext = true;
    // } else {
    //     console.error(
    //         'Navigation not possible, no parent navigationContext found.'
    //     );
    // }
    this.options.fromContext = null;
    this.options.fromClosestContext = true;
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
