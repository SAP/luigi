import type { Luigi } from '../luigi';

export interface AlertSettings {
  text?: string;
  type?: string;
  links?: Link[];
  closeAfter?: number;
  id?: number;
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
    // TODO
    console.log('processAlerts');
    return alertSettings;
  }

  handleAlerts(alertSettings: AlertSettings, openFromClient: boolean, containerElement: any) {
    // TODO processAlerts
    this.luigi._connector?.renderAlert(alertSettings, openFromClient, containerElement).then((resolve) => {
      containerElement.closeAlert(resolve, 'dismisskey');
    });
  }
}
