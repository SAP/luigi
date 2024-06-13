import { Helpers } from "./helpers";
import { NavigationService } from "./services/navigation.service";

export const Routing = {
    init: (luigi: any) => {
        const navService = new NavigationService(luigi);
        const luigiConfig = luigi.getConfig();
        console.log('Init Routing...', luigiConfig.routing);
        if(luigiConfig.routing?.useHashRouting) {
            window.addEventListener('hashchange', (ev) => {
                console.log('HashChange', location.hash);
                const path = Helpers.normalizePath(location.hash);
                luigi._connector.renderTopNav(navService.getTopNavData());
                luigi._connector.renderLeftNav(navService.getLeftNavData(path));
                luigi._connector.renderContent(navService.getCurrentNode(path));
            });
        } else {

        }
    }
}
