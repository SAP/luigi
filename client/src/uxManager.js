import { LuigiClientBase } from './baseClass';
import { lifecycleManager } from './lifecycleManager';
import { helpers } from './helpers';

/**
 * Use the UX Manager to manage the appearance features in Luigi.
 * @name uxManager
 */
class UxManager extends LuigiClientBase {
  /** @private */
  constructor() {
    super();
    helpers.addEventListener('luigi.current-locale-changed', e => {
      if (e.data.currentLocale && lifecycleManager.currentContext?.internal) {
        lifecycleManager.currentContext.internal.currentLocale =
          e.data.currentLocale;
        lifecycleManager._notifyUpdate();
      }
    });
  }

  /**
   * Adds a backdrop with a loading indicator for the micro frontend frame. This overrides the {@link navigation-parameters-reference.md#loadingIndicator.enabled loadingIndicator.enabled} setting.
   * @memberof uxManager
   */
  showLoadingIndicator() {
    helpers.sendPostMessageToLuigiCore({ msg: 'luigi.show-loading-indicator' });
  }

  /**
   * Removes the loading indicator. Use it after calling {@link #showLoadingIndicator showLoadingIndicator()} or to hide the indicator when you use the {@link navigation-parameters-reference.md#loadingIndicator.hideAutomatically loadingIndicator.hideAutomatically: false} node configuration.
   * @memberof uxManager
   */
  hideLoadingIndicator() {
    helpers.sendPostMessageToLuigiCore({ msg: 'luigi.hide-loading-indicator' });
  }
  /**
   * Adds a backdrop to block the top and side navigation. It is based on the Fundamental UI Modal, which you can use in your micro frontend to achieve the same behavior.
   * @memberof uxManager
   */
  addBackdrop() {
    helpers.sendPostMessageToLuigiCore({ msg: 'luigi.add-backdrop' });
  }
  /**
   * Removes the backdrop.
   * @memberof uxManager
   */
  removeBackdrop() {
    helpers.sendPostMessageToLuigiCore({ msg: 'luigi.remove-backdrop' });
  }
  /**
   * This method informs the main application that there are unsaved changes in the current view in the iframe. For example, that can be a view with form fields which were edited but not submitted.
   * @param {boolean} isDirty: indicates if there are any unsaved changes on the current page or in the component
   * @memberof uxManager
   */
  setDirtyStatus(isDirty) {
    helpers.sendPostMessageToLuigiCore({
      msg: 'luigi.set-page-dirty',
      dirty: isDirty
    });
  }
  /**
   * Shows a confirmation modal.
   * @memberof uxManager
   * @param {Object} settings: the settings of the confirmation modal. If you don't provide any value for any of the fields, a default value is used
   * @param {string} [settings.header="Confirmation"] : the content of the modal header
   * @param {string} [settings.body="Are you sure you want to do this?"] : the content of the modal body
   * @param {string} [settings.buttonConfirm="Yes"] : the label for the modal confirm button
   * @param {string} [settings.buttonDismiss="No"] : the label for the modal dismiss button
   * @returns {promise} which is resolved when accepting the confirmation modal and rejected when dismissing it
   * @example
   * import LuigiClient from '@kyma-project/luigi-client';
   * const settings = {
   *  header: "Confirmation",
   *  body: "Are you sure you want to do this?",
   *  buttonConfirm: "Yes",
   *  buttonDismiss: "No"
   * }
   * LuigiClient
   *  .uxManager()
   *  .showConfirmationModal(settings)
   *  .then(() => {
   *     // Logic to execute when the confirmation modal is dismissed
   *  });
   */
  showConfirmationModal(settings) {
    helpers.addEventListener(
      'luigi.ux.confirmationModal.hide',
      (e, listenerId) => {
        this.hideConfirmationModal(e.data.data);
        helpers.removeEventListener(listenerId);
      }
    );
    helpers.sendPostMessageToLuigiCore({
      msg: 'luigi.ux.confirmationModal.show',
      data: { settings }
    });

    const confirmationModalPromise = {};
    confirmationModalPromise.promise = new Promise((resolve, reject) => {
      confirmationModalPromise.resolveFn = resolve;
      confirmationModalPromise.rejectFn = reject;
    });
    this.setPromise('confirmationModal', confirmationModalPromise);
    return confirmationModalPromise.promise;
  }

  /**
   * @private
   * @memberof uxManager
   * @param {Object} modal confirmed boolean value if ok or cancel has been pressed
   */
  hideConfirmationModal(modal) {
    const promise = this.getPromise('confirmationModal');
    if (promise) {
      modal.confirmed ? promise.resolveFn() : promise.rejectFn();
      this.setPromise('confirmationModal', undefined);
    }
  }

  /**
   * Shows an alert.
   * @memberof uxManager
   * @param {Object} settings: the settings for the alert
   * @param {string} settings.text: the content of the alert. To add a link to the content, you have to set up the link in the `links` object. The key(s) in the `links` object must be used in the text to reference the links, wrapped in curly brackets with no spaces. If you don't specify any text, the alert is not displayed
   * @param {('info'|'success'|'warning'|'error')} settings.type: sets the type of alert
   * @param {Object} settings.links: provides links data
   * @param {Object} settings.links.LINK_KEY: object containing the data for a particular link. To properly render the link in the alert message refer to the description of the **settings.text** parameter
   * @param {string} settings.links.LINK_KEY.text: text which replaces the link identifier in the alert content
   * @param {string} settings.links.LINK_KEY.url: url to navigate when you click the link. Currently, only internal links are supported in the form of relative or absolute paths.
   * @param {number} settings.closeAfter (optional): time in milliseconds that tells Luigi when to close the Alert automatically. If not provided, the Alert will stay on until closed manually. It has to be greater than `100`.
   * @returns {promise} which is resolved when the alert is dismissed.
   * @example
   * import LuigiClient from '@kyma-project/luigi-client';
   * const settings = {
   *  text: "Ut enim ad minim veniam, {goToHome} quis nostrud exercitation ullamco {relativePath}. Duis aute irure dolor {goToOtherProject}",
   *  type: 'info',
   *  links: {
   *    goToHome: { text: 'homepage', url: '/overview' },
   *    goToOtherProject: { text: 'other project', url: '/projects/pr2' },
   *    relativePath: { text: 'relative hide side nav', url: 'hideSideNav' }
   *  },
   *  closeAfter: 3000
   * }
   * LuigiClient
   *  .uxManager()
   *  .showAlert(settings)
   *  .then(() => {
   *     // Logic to execute when the alert is dismissed
   *  });
   */
  showAlert(settings) {
    helpers.addEventListener('luigi.ux.alert.hide', (e, listenerId) => {
      this.hideAlert(e.data.id);
      helpers.removeEventListener(listenerId);
    });

    //generate random ID
    settings.id = helpers.getRandomId();
    if (settings?.closeAfter < 100) {
      console.warn(
        `Message with id='${
          settings.id
        }' has too small 'closeAfter' value. It needs to be at least 100ms.`
      );
      settings.closeAfter = undefined;
    }
    helpers.sendPostMessageToLuigiCore({
      msg: 'luigi.ux.alert.show',
      data: { settings }
    });

    const alertPromises = this.getPromise('alerts') || {};
    alertPromises[settings.id] = {};
    alertPromises[settings.id].promise = new Promise(resolve => {
      alertPromises[settings.id].resolveFn = resolve;
    });
    this.setPromise('alerts', alertPromises);
    return alertPromises[settings.id].promise;
  }
  /**
   * @private
   * @memberof uxManager
   * @param {string} id: alert id
   */
  hideAlert(id) {
    const alerts = this.getPromise('alerts');
    if (id && alerts[id]) {
      alerts[id].resolveFn(id);
      delete alerts[id];
      this.setPromise('alerts', alerts);
    }
  }

  /**
   * Gets the current locale.
   * @returns {string}: current locale
   * @memberof uxManager
   */
  getCurrentLocale() {
    return lifecycleManager.currentContext?.internal?.currentLocale;
  }

  /**
   * Sets current locale to the specified one.
   *
   * **NOTE:** this must be explicitly allowed on the navigation node level by setting `clientPermissions.changeCurrentLocale` to `true`. (See {@link navigation-parameters-reference.md#node-parameters Node parameters}.)
   *
   * @param {string} locale: locale to be set as the current locale
   * @memberof uxManager
   */
  setCurrentLocale(locale) {
    if (locale) {
      helpers.sendPostMessageToLuigiCore({
        msg: 'luigi.ux.set-current-locale',
        data: {
          currentLocale: locale
        }
      });
    }
  }

  /**
   * Checks if the current micro frontend is displayed inside a split view
   * @returns {boolean} indicating if it is loaded inside a split view
   * @memberof uxManager
   * @since 0.6.0
   */
  isSplitView() {
    return lifecycleManager.currentContext?.internal?.splitView;
  }

  /**
   * Checks if the current micro frontend is displayed inside a modal
   * @returns {boolean} indicating if it is loaded inside a modal
   * @memberof uxManager
   * @since 0.6.0
   */
  isModal() {
    return lifecycleManager.currentContext?.internal?.modal;
  }
}
export const uxManager = new UxManager();
