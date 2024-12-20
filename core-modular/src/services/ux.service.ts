import type { LuigiContainer } from '@luigi-project/container';
import type { Luigi } from '../luigi';

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

export class UxService {
  constructor(private luigi: Luigi) {}

  processAlerts(alertSettings: any): any {
    const settings = {
      settings: alertSettings
    };
    return settings;
  }

  handleAlerts(alertSettings: AlertSettings, openFromClient: boolean, containerElement: HTMLElement) {
    alertSettings = this.processAlerts(alertSettings);
    this.luigi._connector?.renderAlert(alertSettings, openFromClient, containerElement).then((resolve) => {
      const { containerElement, alertSettings, dismissKey } = resolve;
      this.handleAlertDismiss(containerElement, alertSettings, dismissKey);
    });
  }

  handleAlertDismiss = (containerElement: LuigiContainer, alertSettings: ProcessedAlertSettings, dismissKey: any) => {
    const alertId = alertSettings.settings.id;
    if (alertId) {
      if (dismissKey) {
        containerElement.closeAlert(alertId, dismissKey);
      } else {
        containerElement.closeAlert(alertId, ''); //TODO LuigiContainer dismissKey sollte optional sein
      }
    }
  };
}
