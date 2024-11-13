import { Helpers } from './helpers';
import type { Luigi } from './luigi';
import { ModalSettings, NavigationService } from './services/navigation.service';

const createContainer = (node: any): HTMLElement => {
  const lc: any = document.createElement('luigi-container');
  lc.setAttribute('viewUrl', node.viewUrl);
  lc.webcomponent = node.webcomponent;
  lc.context = node.context;
  return lc;
};

export const UI = {
  navService: undefined,
  init: (luigi: Luigi) => {
    console.log('Init UI...');
    luigi._connector?.renderMainLayout();
    const navService = new NavigationService(luigi);
    const path = Helpers.normalizePath(location.hash);
    const redirect = navService.shouldRedirect(path);
    if (redirect) {
      luigi.navigation().navigate(redirect);
      return;
    }

    luigi._connector?.renderTopNav(navService.getTopNavData());
    luigi._connector?.renderLeftNav(navService.getLeftNavData(path));

    const currentNode = navService.getCurrentNode(path);
    if (currentNode) {
      UI.updateMainContent(currentNode, luigi);
    }
  },
  updateMainContent: (currentNode: any, luigi: Luigi) => {
    const containerWrapper = luigi._connector?.getContainerWrapper();
    // if viewgroup and preload do some caching/restoring... for now only re-render
    if (currentNode && containerWrapper) {
      containerWrapper.innerHTML = '';
      containerWrapper?.appendChild(createContainer(currentNode));
    }
  },
  openModal: (luigi: Luigi, node: any, modalSettings: ModalSettings, onCloseCallback: Function) => {
    const lc = createContainer(node);
    const modalHandle = luigi._connector?.renderModal(lc, modalSettings, onCloseCallback);
  }
};
