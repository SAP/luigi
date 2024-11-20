import { Helpers } from './helpers';
import type { Luigi } from './luigi';
import { NavigationService } from './services/navigation.service';
import type { ModalSettings } from './services/navigation.service';

const createContainer = (node: any): HTMLElement => {
  const lc: any = document.createElement('luigi-container');
  lc.setAttribute('viewUrl', node.viewUrl);
  lc.webcomponent = node.webcomponent;
  lc.context = node.context;
  lc.viewGroup = node.viewGroup;
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
    if (currentNode && containerWrapper) {
      let viewGroupContainer: any;
      containerWrapper.childNodes.forEach((element: any) => {
        if (element.viewGroup) {
          if (currentNode.viewGroup === element.viewGroup) {
            viewGroupContainer = element;
          } else {
            element.style.display = 'none';
          }
        } else {
          element.remove();
        }
      });

      if (viewGroupContainer) {
        viewGroupContainer.style.display = 'block';
        viewGroupContainer.updateContext({ viewUrl: currentNode.viewUrl });
      } else {
        containerWrapper?.appendChild(createContainer(currentNode));
      }
    }
  },
  openModal: (luigi: Luigi, node: any, modalSettings: ModalSettings, onCloseCallback: Function) => {
    const lc = createContainer(node);
    const modalHandle = luigi._connector?.renderModal(lc, modalSettings, onCloseCallback);
  }
};
