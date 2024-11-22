import Events from '@luigi-project/container';
import type { Luigi } from './luigi';


export const Communication = {
    init: (luigi: Luigi) => {
        console.log('Init communication...');
    },
    addListeners: (containerElement: any, luigi: Luigi) => {        
        containerElement.addEventListener(Events.NAVIGATION_REQUEST, (event: any) => {
            luigi.navigation().navigate((event as any).detail.link);
        });
    }
}