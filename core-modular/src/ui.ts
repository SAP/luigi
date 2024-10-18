import { Helpers } from "./helpers";
import type { Luigi } from "./luigi";
import { NavigationService } from "./services/navigation.service";

const renderContainer = () => {

}

export const UI = {
    navService : undefined,
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

        renderContainer();
        const currentNode = navService.getCurrentNode(path);
        if(currentNode) {
            UI.updateMainContent(currentNode, luigi);
        }
    },
    updateMainContent: (currentNode: any, luigi: Luigi) => {
        const containerWrapper = luigi._connector?.getContainerWrapper();
        // if viewgroup and preload do some caching/restoring... for now only re-render
        if(currentNode && containerWrapper) {
            containerWrapper.innerHTML = '';
            const lc: any = document.createElement('luigi-container');
            lc.setAttribute('viewUrl', currentNode.viewUrl);
            lc.webcomponent = currentNode.webcomponent;
            lc.context = currentNode.context;
            containerWrapper?.appendChild(lc);
        }
    }
}
