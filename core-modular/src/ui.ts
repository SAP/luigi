import { Helpers } from './helpers';
import type { Luigi } from './luigi';
import { NavigationService, type ModalSettings } from './services/navigation.service';
import { LuigiCompoundContainer, LuigiContainer } from '@luigi-project/container';

const createContainer = (node: any, luigi: Luigi): HTMLElement => {
  if (node.compound) {
    const lcc: LuigiCompoundContainer = document.createElement('luigi-compound-container') as LuigiCompoundContainer;
    lcc.viewurl = node.viewUrl;
    lcc.webcomponent = node.webcomponent;
    lcc.compoundConfig = node.compound;
    lcc.context = node.context;
    (lcc as any).viewGroup = node.viewGroup;
    luigi._comm.addListeners(lcc, luigi);
    return lcc;
  } else {
    const lc: LuigiContainer = document.createElement('luigi-container') as LuigiContainer;
    lc.viewurl = node.viewUrl;
    lc.webcomponent = node.webcomponent;
    lc.context = node.context;
    (lc as any).viewGroup = node.viewGroup;
    luigi._comm.addListeners(lc, luigi);
    return lc;
  }
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
    luigi._connector?.renderTabNav(navService.getTabNavData(path));

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
        viewGroupContainer.updateViewUrl(currentNode.viewUrl);
      } else {
        containerWrapper?.appendChild(createContainer(currentNode, luigi));
      }
    }
  },
  openModal: (luigi: Luigi, node: any, modalSettings: ModalSettings, onCloseCallback: Function) => {
    const lc = createContainer(node, luigi);
    const modalHandle = luigi._connector?.renderModal(lc, modalSettings, onCloseCallback);
  }
};
