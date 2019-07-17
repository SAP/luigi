import { LuigiClientBase } from './baseClass';
import { helpers } from './helpers';

/**
 * The Split View 
  - Actions to control the split view
  - Event handlers
  - Get the current state
  * @name splitView
  */
export class splitViewHandle extends LuigiClientBase {
  /**
   * @private
   */
  constructor(settings) {
    super();

    this.splitView = {
      exists: true,
      size: 0,
      collapsed: false
    };

    Object.assign(this, settings);

    this.splitView.listeners = [
      helpers.addEventListener(
        `luigi-client.navigation.splitview.internal`,
        e => {
          // console.log('received new internal data', e.data.data);
          Object.assign(this.splitView, e.data.data);
        }
      ),
      helpers.addEventListener(
        `luigi-client.navigation.splitview.resize`,
        e => {
          this.splitView.size = e.data.data;
        }
      ),
      helpers.addEventListener(
        `luigi-client.navigation.splitview.collapse`,
        () => {
          this.splitView.collapsed = true;
        }
      ),
      helpers.addEventListener(
        `luigi-client.navigation.splitview.expand`,
        () => {
          this.splitView.collapsed = false;
        }
      )
    ];
    window.onunload = () => {
      this.splitView.listeners.forEach(id => helpers.removeEventListener(id));
    };
  }

  /*
   * @private
   */
  sendSplitViewAction(action, data) {
    window.parent.postMessage({
      msg: `luigi.navigation.splitview.${action}`,
      data
    });
  }

  /**
   * Collapses the split view
   * @memberof splitView
   * @example
   * splitViewHandle.collapse();
   */
  collapse() {
    this.sendSplitViewAction('collapse');
  }
  /**
   * Expands the split view
   * @memberof splitView
   * @example
   * splitViewHandle.expand();
   */
  expand() {
    this.sendSplitViewAction('expand');
  }
  /**
   * Sets the height of the split view
   * @memberof splitView
   * @param {number} value lower height in percent
   * @example
   * splitViewHandle.setSize(60);
   */
  setSize(value) {
    this.sendSplitViewAction('set-size', value);
  }
  /**
   * Registers a listener for split view events
   * @memberof splitView
   * @param {enum} key a set of predefined events: expand, collapse, resize, close
   * @param {function} callback gets called when this event occurs
   * @returns {string} listener id
   * @example
   * const listenerId = splitViewHandle.on('expand', () => {});
   * const listenerId = splitViewHandle.on('collapse', () => {});
   * const listenerId = splitViewHandle.on('resize', () => {});
   * const listenerId = splitViewHandle.on('close', () => {});
   **/
  on(key, callback) {
    return helpers.addEventListener(
      `luigi-client.navigation.splitview.${key}`,
      e => callback(e.data.data)
    );
  }
  /**
   * Unregisters a split view listener
   * @memberof splitView
   * @param {string} id listener id
   * @example
   * splitViewHandle.removeEventListener(listenerId);
   */
  removeEventListener(id) {
    return helpers.removeEventListener(id);
  }
  // TODO: check if we want to provide removeListener, alterantively as last param in the callback or do not provide it
  // removeListener: (id) => { return helpers.removeEventListener(id); },
  /**
   * Collapses the split view
   * @memberof splitView
   * @returns {boolean} true if a split view is loaded
   * @example
   * splitViewHandle.exists();
   */
  exists() {
    return this.splitView.exists;
  }
  /**
   * Reads the size of the split view
   * @memberof splitView
   * @returns {number} height in percent
   * @example
   * splitViewHandle.getSize();
   */
  getSize() {
    return this.splitView.size;
  }
  /**
   * Reads the collapse status
   * @memberof splitView
   * @returns {boolean} true if the split view is currently collapsed
   * @example
   * splitViewHandle.isCollapsed();
   */
  isCollapsed() {
    return this.splitView.collapsed;
  }
  /**
   * Reads the expand status
   * @memberof splitView
   * @returns {boolean} true if the split view is currently expanded
   * @example
   * splitViewHandle.isExpanded();
   */
  isExpanded() {
    return !this.splitView.collapsed;
  }

  /**
   * Closes and destroys the split view
   * @memberof splitView
   * @example
   * splitViewHandle.close();
   */
  close() {
    this.sendSplitViewAction('close');
  }
}
