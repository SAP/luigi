import { Helpers } from "./helpers";
import { NavigationService } from "./services/navigation.service";

export const UI = {
    init: (luigi: any) => {        
        console.log('Init UI...');
        const navService = new NavigationService(luigi);
        const path = Helpers.normalizePath(location.hash);
        luigi._connector.renderTopNav(navService.getTopNavData());
        luigi._connector.renderLeftNav(navService.getLeftNavData(path));
        luigi._connector.renderContent(navService.getCurrentNode(path));
    }
}
