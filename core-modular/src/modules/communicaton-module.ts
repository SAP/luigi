import Events from '@luigi-project/container';
import { UXModule } from './ux-module';
import type { Luigi } from '../core-api/luigi';

export const CommunicationModule = {
  init: (luigi: Luigi) => {
    console.log('Init communication...');
  },
  addListeners: (containerElement: any, luigi: Luigi) => {
    containerElement.addEventListener(Events.NAVIGATION_REQUEST, (event: any) => {
      luigi.navigation().navigate((event as any).detail.link);
    });
    containerElement.addEventListener(Events.ALERT_REQUEST, (event: any) => {
      UXModule.processAlert(event.detail.data.data.settings, true, containerElement);
    });
    containerElement.addEventListener(Events.SHOW_CONFIRMATION_MODAL_REQUEST, (event: any) => {
      UXModule.handleConfirmationModalRequest(event.detail.settings, containerElement);
    });
  }
};
