import type { Luigi } from '../core-api/luigi';

export interface AlertSettings {
  text?: string;
  type?: string;
  links?: Record<string, Link>;
  closeAfter?: number;
  id?: string;
}

export interface AlertHandler {
  openFromClient: boolean;
  close(): void;
  link(linkKey: string): boolean;
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
export interface ConfirmationModalHandler {
  confirm(): void;
  dismiss(): void;
}

export const UXModule = {
  luigi: undefined as Luigi | undefined,
  init: (luigi: Luigi) => {
    console.log('ux init...');
    UXModule.luigi = luigi;
  },
  processAlert: (alertSettings: AlertSettings, openFromClient: boolean, containerElement: any) => {
    if (!UXModule.luigi) {
      throw new Error('Luigi is not initialized.');
    }

    const alertHandler = {
      openFromClient,
      close: () => {
        containerElement.closeAlert(alertSettings.id);
      },
      link: (linkKey: string) => {
        if (alertSettings.links) {
          const link = alertSettings.links[linkKey];
          if (link) {
            link.url && UXModule.luigi?.navigation().navigate(link.url);
            if (link.dismissKey) {
              containerElement.closeAlert(alertSettings.id, link.dismissKey);
              return true;
            }
          }
        }
        return false;
      }
    };
    UXModule.luigi.getEngine()._connector?.renderAlert(alertSettings, alertHandler);
  },

  handleConfirmationModalRequest: (confirmationModalSettings: ConfirmationModalSettings, containerElement: any) => {
    if (!UXModule.luigi) {
      throw new Error('Luigi is not initialized.');
    }
    UXModule.luigi.getEngine()._connector?.renderConfirmationModal(
      confirmationModalSettings,
      {
        // TODO: container does not have a "notifyConfirmationModalClosed" function yet
        confirm() {
          console.log('confirmation Modal confirmed');
        },
        dismiss() {
          console.log('confirmation Modal dismissed');
        },
      }
    );
  }
};
