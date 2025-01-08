import { NavigationService } from './services/navigation.service';
import { Luigi } from './luigi';
import type { LuigiContainer } from '@luigi-project/container';

export interface AlertSettings {
  text?: string;
  type?: string;
  links?: Link[];
  closeAfter?: number;
  id?: string;
}

export interface ProcessedAlertSettings {
  settings: AlertSettings;
}

export interface Link {
  elemId: string;
  url?: string;
  dismissKey?: string;
}

export interface ProcessedTextAndLinks {
  sanitizedText: string;
  links: Link[];
}

export interface ConfirmationModalSettings {
  type?: string;
  header?: string;
  body?: string;
  buttonConfirm?: string;
  buttonDismiss?: string;
}

export const Ux = {
  luigi: undefined as Luigi | undefined,
  init: (luigi: Luigi) => {
    console.log('ux init...');
    Ux.luigi = luigi;
  },
  processAlerts: (alertSettings: AlertSettings) => {
    return { settings: alertSettings };
  },
  handleAlerts: (alertSettings: AlertSettings, openFromClient: boolean, containerElement: any) => {
    if (!Ux.luigi) {
      throw new Error('Luigi is not initialized.');
    }
    // @ts-ignore
    alertSettings = Ux.processAlerts(alertSettings);
    containerElement.handleAlertLinksClick = Ux.handleAlertLinksClick;
    Ux.luigi._connector?.renderAlert(alertSettings, openFromClient, containerElement).then((resolve) => {
      const { containerElement, alertSettings, dismissKey } = resolve;
      Ux.handleAlertDismiss(containerElement, alertSettings, dismissKey);
    });
  },
  handleAlertDismiss: (containerElement: LuigiContainer, alertSettings: ProcessedAlertSettings, dismissKey: any) => {
    const alertId = alertSettings.settings.id;
    if (alertId) {
      if (dismissKey) {
        containerElement.closeAlert(alertId, dismissKey);
      } else {
        containerElement.closeAlert(alertId, ''); //TODO LuigiContainer dismissKey sollte optional sein
      }
    }
  },
  handleAlertLinksClick: (
    containerElement: any,
    messageStrip: any,
    alertSettings: any,
    linkKey: string,
    resolve: any
  ) => {
    if (!Ux.luigi) {
      throw new Error('Luigi is not initialized.');
    }
    const link = alertSettings.settings.links[linkKey];
    if (link.dismissKey) {
      const dismissKey = link.dismissKey;
      resolve({ containerElement, alertSettings, dismissKey });
      const alertContainer = messageStrip.parentElement;
      if (alertContainer) {
        alertContainer.removeChild(messageStrip);
      }
    } else {
      Ux.luigi.navigation().navigate(link.url);
    }
  },
  handleConfirmationModalRequest: (confirmationModalSettings: ConfirmationModalSettings) => {
    // @ts-ignore
    this.luigi._connector?.renderConfirmationModal(confirmationModalSettings).then((resolve) => {
      console.log('confirmation Modal closed with', resolve);
    });
  }
};
