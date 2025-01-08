import Events from '@luigi-project/container';
import type { Luigi } from './luigi';
import { Ux } from './ux';

export const Communication = {
  init: (luigi: Luigi) => {
    console.log('Init communication...');
  },
  addListeners: (containerElement: any, luigi: Luigi) => {
    containerElement.addEventListener(Events.NAVIGATION_REQUEST, (event: any) => {
      luigi.navigation().navigate((event as any).detail.link);
    });
    containerElement.addEventListener(Events.ALERT_REQUEST, (event: any) => {
      Ux.handleAlerts(event.detail.data.data.settings, true, containerElement);
    });
    containerElement.addEventListener(Events.SHOW_CONFIRMATION_MODAL_REQUEST, (event: any) => {
      Ux.handleConfirmationModalRequest(event.detail.settings);
    });
  }
};
