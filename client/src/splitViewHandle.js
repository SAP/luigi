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

    this.validSplitViewEvents = ['expand', 'collapse', 'resize', 'close'];

    this.splitView = {
      exists: true,
      size: 40,
      collapsed: false
    };

    Object.assign(this, settings);

    this.splitView.listeners = [
      helpers.addEventListener(`luigi.navigation.splitview.internal`, e => {
        // console.log('received new internal data', e.data.data);
        Object.assign(this.splitView, e.data.data);
      }),
      this.on('resize', e => {
        this.splitView.size = e.data.data;
      }),
      this.on('collapse', e => {
        this.splitView.collapsed = true;
      }),
      this.on('expand', e => {
        this.splitView.collapsed = false;
      })
    ];
    window.onunload = () => {
      this.splitView.listeners.forEach(id => helpers.removeEventListener(id));
    };
  }

  /*
   * @private
   */
  sendMessageToCore(action, data) {
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
    this.sendMessageToCore('collapse');
  }
  /**
   * Expands the split view
   * @memberof splitView
   * @example
   * splitViewHandle.expand();
   */
  expand() {
    this.sendMessageToCore('expand');
  }
  /**
   * Sets the height of the split view
   * @memberof splitView
   * @param {number} value lower height in percent
   * @example
   * splitViewHandle.setSize(60);
   */
  setSize(value) {
    this.sendMessageToCore('resize', value);
  }
  /**
   * Registers a listener for split view events
   * @memberof splitView
   * @param {('expand'|'collapse'|'resize'|'close')} name event name
   * @param {function} callback gets called when this event gets triggered by Luigi
   * @returns {string} listener id
   * @example
   * const listenerId = splitViewHandle.on('expand', () => {});
   * const listenerId = splitViewHandle.on('collapse', () => {});
   * const listenerId = splitViewHandle.on('resize', () => {});
   * const listenerId = splitViewHandle.on('close', () => {});
   **/
  on(name, callback) {
    if (!this.validSplitViewEvents.includes(name)) {
      console.warn(name + ' is not a valid split view event');
      return false;
    }
    return helpers.addEventListener(
      `luigi.navigation.splitview.${name}.ok`,
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

  /**
   * Gets the split view status
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
    this.sendMessageToCore('close');
  }
}
