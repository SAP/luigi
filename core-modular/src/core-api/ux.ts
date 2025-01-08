import type { Luigi } from '../luigi';

import { GenericHelpers } from '../utilities/helpers/generic-helpers';
import { Ux, type AlertSettings, type ProcessedAlertSettings, type ConfirmationModalSettings } from '../ux';

export class UX {
  luigi: Luigi;

  constructor(luigi: Luigi) {
    this.luigi = luigi;
  }

  showAlert = (alertSettings: AlertSettings) => {
    return new Promise((resolve) => {
      if (!alertSettings.id) {
        //TODO closeAlert will eine id als string
        alertSettings.id = GenericHelpers.getRandomId().toString();
      }
      const processedAlerts = Ux.processAlerts(alertSettings);
      // @ts-ignore
      this.luigi._connector?.renderAlert(processedAlerts, false).then((res) => {
        const { alertSettings, dismissKey } = res;
        resolve(dismissKey || alertSettings.settings.id);
      });
    });
  };

  showConfirmationModal = (settings: ConfirmationModalSettings) => {
    return new Promise((resolve) => {
      this.luigi._connector?.renderConfirmationModal(settings, false).then((res) => {
        resolve(res);
      });
    });
  };
}
