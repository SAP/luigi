import type { ModalSettings, LeftNavData, Node, TopNavData, TabNavData } from '../services/navigation.service';

export interface LuigiConnector {
  renderMainLayout(): void;

  renderTopNav(data: TopNavData): void;

  renderLeftNav(data: LeftNavData): void;

  getContainerWrapper(): HTMLElement;

  renderModal(container: HTMLElement, modalSettings: ModalSettings, onCloseCallback: Function): any;

  renderTabNav(data: TabNavData): void;
}

export type { Node };