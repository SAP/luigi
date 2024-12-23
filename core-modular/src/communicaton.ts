import Events from '@luigi-project/container';
import type { Luigi } from './luigi';
import { UxService } from './services/ux.service';

export const Communication = {
  init: (luigi: Luigi) => {
    console.log('Init communication...');
  },
  addListeners: (containerElement: any, luigi: Luigi) => {
    containerElement.addEventListener(Events.NAVIGATION_REQUEST, (event: any) => {
      luigi.navigation().navigate((event as any).detail.link);
    });
    containerElement.addEventListener(Events.ALERT_REQUEST, (event: any) => {
      const uxService = new UxService(luigi);
      uxService.handleAlerts(event.detail.data.data.settings, true, containerElement);
    });
    containerElement.addEventListener(Events.SHOW_CONFIRMATION_MODAL_REQUEST, (event: any) => {
      const uxService = new UxService(luigi);
      uxService.handleConfirmationModalRequest(event.detail.settings);
    });
  }
};
