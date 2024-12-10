import type { Luigi } from '../luigi';
import { UxService } from '../services/ux.service';
import type { AlertSettings } from '../services/ux.service';
import { GenericHelpers } from '../utilities/helpers/generic-helpers';

export class UX {
  luigi: Luigi;
  uxService: UxService;

  constructor(luigi: Luigi) {
    this.luigi = luigi;
    this.uxService = new UxService(luigi);
  }

  showAlert = (alertSettings: AlertSettings) => {
    if (!alertSettings.id) {
      alertSettings.id = GenericHelpers.getRandomId();
    }
    const processedAlerts = this.uxService.processAlerts(alertSettings);
    return new Promise((resolve) => {
      this.luigi._connector?.renderAlert(alertSettings, false, resolve);
    });
  };
}
