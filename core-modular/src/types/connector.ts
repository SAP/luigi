import type { ModalSettings, LeftNavData, Node, TopNavData } from "../services/navigation.service";

export interface LuigiConnector {
    renderMainLayout(): void;

    renderTopNav(data: TopNavData): void;

    renderLeftNav(data: LeftNavData): void;

    getContainerWrapper(): HTMLElement;

    renderModal(container: HTMLElement, modalSettings: ModalSettings, onCloseCallback): any;
}