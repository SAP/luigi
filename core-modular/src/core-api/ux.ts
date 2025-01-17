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
      const handler = {
        openFromClient: false,
        close: () => {
          resolve(true);
        },
        link: (linkKey: string) => {
          if (alertSettings.links) {
            const link = alertSettings.links[linkKey];
            if (link) {
              link.url && Ux.luigi?.navigation().navigate(link.url);
              if (link.dismissKey) {
                resolve(link.dismissKey);
                return true;
              }
            }
          }
          return false;
        }
      };
      this.luigi._connector?.renderAlert(alertSettings, handler);
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
