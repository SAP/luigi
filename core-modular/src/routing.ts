import { Helpers } from "./helpers";
import type { Luigi } from "./luigi";
import { NavigationService } from "./services/navigation.service";

export const Routing = {
    init: (luigi: Luigi) => {
        const navService = new NavigationService(luigi);
        const luigiConfig = luigi.getConfig();
        console.log('Init Routing...', luigiConfig.routing);
        if(luigiConfig.routing?.useHashRouting) {
            window.addEventListener('hashchange', (ev) => {
                console.log('HashChange', location.hash);
                const path = Helpers.normalizePath(location.hash);
                const redirect = navService.shouldRedirect(path);
                if (redirect) {
                    luigi.navigation().navigate(redirect);
                    return;
                }
                const currentNode = navService.getCurrentNode(path);
                luigi._connector?.renderTopNav(navService.getTopNavData());
                luigi._connector?.renderLeftNav(navService.getLeftNavData(path));
                luigi._connector?.renderTabNav(navService.getTabNavData(path));
                luigi._ui.updateMainContent(currentNode, luigi);
            });
        } else {
            // TBD
        }
    }
}
