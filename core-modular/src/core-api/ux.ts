import type { Luigi } from '../luigi';
import { UxService } from '../services/ux.service';
import type { AlertSettings, Link, ProcessedAlertSettings } from '../services/ux.service';
import { GenericHelpers } from '../utilities/helpers/generic-helpers';

export class UX {
  luigi: Luigi;
  uxService: UxService;

  constructor(luigi: Luigi) {
    this.luigi = luigi;
    this.uxService = new UxService(luigi);
  }

  showAlert = (alertSettings: AlertSettings) => {
    return new Promise((resolve) => {
      if (!alertSettings.id) {
        //TODO closeAlert will eine id als string
        alertSettings.id = GenericHelpers.getRandomId().toString();
      }
      const processedAlerts = this.uxService.processAlerts(alertSettings);
      this.luigi._connector?.renderAlert(processedAlerts, false).then((res) => {
        const { alertSettings, dismissKey } = res;
        resolve(dismissKey || alertSettings.settings.id);
      });
    });
  };
}
