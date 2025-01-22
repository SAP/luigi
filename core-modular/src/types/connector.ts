import type { ModalSettings, LeftNavData, Node, TopNavData, TabNavData } from '../services/navigation.service';
import type { AlertHandler, AlertSettings, ConfirmationModalSettings } from '../modules/ux-module';

export interface LuigiConnector {
  renderMainLayout(): void;

  renderTopNav(data: TopNavData): void;

  renderLeftNav(data: LeftNavData): void;

  getContainerWrapper(): HTMLElement;

  renderModal(content: HTMLElement, modalSettings: ModalSettings, onCloseCallback: Function): any;

  renderTabNav(data: TabNavData): void;

  renderAlert(alertSettings: AlertSettings, alertHandler: AlertHandler): void;

  renderConfirmationModal(
    confirmationModalSettings: ConfirmationModalSettings,
    openFromClient: boolean,
    containerElement?: HTMLElement
  ): Promise<any>;
}

export type { Node };
