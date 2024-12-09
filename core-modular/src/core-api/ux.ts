import type { Luigi } from '../luigi';
import { UxService } from '../services/ux.service';
import type { AlertSettings } from '../services/ux.service';
import { GenericHelpers } from '../utilities/helpers/generic-helpers';

export class UX{
    luigi: Luigi;
    uxService: UxService;

    constructor(luigi: Luigi){
        this.luigi = luigi;
        this.uxService = new UxService(luigi)
    }

    showAlert = (alertSettings: AlertSettings, openFromClient = false) => {
        if(!alertSettings.id){
            alertSettings.id = GenericHelpers.getRandomId()
        }
        return new Promise((resolve) => {
            const processedAlerts = this.uxService.processAlerts(alertSettings);
            this.luigi._connector?.renderAlert(alertSettings, openFromClient, resolve);
        });
       
    }
}