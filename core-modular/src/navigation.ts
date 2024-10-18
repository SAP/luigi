import type { Luigi } from "./luigi";
import { NavigationService } from "./services/navigation.service";
import Title from '../../website/fiddle/public/vendor/ui5/webcomponents/Title';

export class Navigation {
    luigi: Luigi;
    hashRouting: boolean = false;
    navService: NavigationService;

    constructor(luigi: Luigi) {
        this.luigi = luigi;
        this.hashRouting = luigi.getConfig().routing?.useHashRouting;        
        this.navService = new NavigationService(luigi);
    }

    navigate = (path: string) => {
        const normalizedPath = path.replace(/\/\/+/g, '/');
        if(this.hashRouting) {
            location.hash = normalizedPath;
        } else {
            console.log('path routing not yet implemented');
        }
    };

    openAsModal = (path: string, modalSettings: any /* TODO: type */, onCloseCallback: Function) => {        
        const normalizedPath = path.replace(/\/\/+/g, '/');
        const node = this.navService.getCurrentNode(normalizedPath);
        const settings = modalSettings || {};
        if (!settings.title) {
            settings.title = node.label;
        }
        this.luigi._ui.openModal(this.luigi, node, settings, onCloseCallback);
    };
}
