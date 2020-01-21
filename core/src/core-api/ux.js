import { APP_LOADING_INDICATOR } from './../utilities/constants';
import { GenericHelpers } from '../utilities/helpers';
/**
 * Functions to use Luigi Core UX features.
 * @namespace UX
 */
class LuigiUX {
  /**
   * Hides the app loading indicator.
   * @memberof UX
   * @since 0.6.4
   */
  hideAppLoadingIndicator() {
    const appLoadingIndicator = document.querySelector(
      APP_LOADING_INDICATOR.cssSelector
    );
    if (appLoadingIndicator) {
      appLoadingIndicator.classList.add('hidden');
      setTimeout(() => {
        appLoadingIndicator.parentNode.removeChild(appLoadingIndicator);
      }, 500);
    }
  }

  /**
   * Shows an alert.
   * @memberof UX
   * @param {Object} settings the settings for the alert
   * @param {string} settings.text the content of the alert. To add a link to the content, you have to set up the link in the `links` object. The key(s) in the `links` object must be used in the text to reference the links, wrapped in curly brackets with no spaces. If you don't specify any text, the alert is not displayed
   * @param {('info'|'success'|'warning'|'error')} settings.type sets the type of alert
   * @param {Object} settings.links provides links data
   * @param {Object} settings.links.LINK_KEY object containing the data for a particular link. To properly render the link in the alert message refer to the description of the **settings.text** parameter
   * @param {string} settings.links.LINK_KEY.text text which replaces the link identifier in the alert content
   * @param {string} settings.links.LINK_KEY.url url to navigate when you click the link. Currently, only internal links are supported in the form of relative or absolute paths
   * @param {number} settings.closeAfter (optional) time in milliseconds that tells Luigi when to close the Alert automatically. If not provided, the Alert will stay on until closed manually. It has to be greater than `100`
   * @returns {promise} which is resolved when the alert is dismissed
   * @since 0.6.4
   * @example
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
   * Luigi
   *  .ux()
   *  .showAlert(settings)
   *  .then(() => {
   *     // Logic to execute when the alert is dismissed
   *  });
   */

  showAlert(settings) {
    if (GenericHelpers.isFunction(Luigi.showAlert)) {
      return Luigi.showAlert(settings);
    } else {
      console.error(
        'Luigi.ux().showAlert() is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
      );
    }
  }

  /**
   * Shows a confirmation modal.
   * @memberof UX
   * @param {Object} settings the settings of the confirmation modal. If you don't provide any value for any of the fields, a default value is used
   * @param {string} [settings.header="Confirmation"] the content of the modal header
   * @param {string} [settings.body="Are you sure you want to do this?"] the content of the modal body
   * @param {string} [settings.buttonConfirm="Yes"] the label for the modal confirm button
   * @param {string} [settings.buttonDismiss="No"] the label for the modal dismiss button
   * @returns {promise} which is resolved when accepting the confirmation modal and rejected when dismissing it
   * @since 0.6.4
   * @example
   * const settings = {
   *  header: "Confirmation",
   *  body: "Are you sure you want to do this?",
   *  buttonConfirm: "Yes",
   *  buttonDismiss: "No"
   * }
   * Luigi
   *  .ux()
   *  .showConfirmationModal(settings)
   *  .then(() => {
   *     // Logic to execute when the confirmation modal is dismissed
   *  });
   */

  showConfirmationModal(settings) {
    if (GenericHelpers.isFunction(Luigi.showConfirmationModal)) {
      return Luigi.showConfirmationModal(settings);
    } else {
      console.error(
        'Luigi.ux().showConfirmationModal() is only available inside your configuration, after the configuration was initialized with Luigi.setConfig().'
      );
    }
  }
}

export const ux = new LuigiUX();
