import './app.scss';
import App from './App.svelte';
import { Navigation } from './navigation';
import { Routing } from './routing';
import { UI } from './ui';

const _init = () => {
    const luigi = (window as any).Luigi;
    Routing.init(luigi);
    UI.init(luigi);
}

class Luigi {
    config: any;

    setConfig(cfg: any) {
        this.config = cfg;
        _init();
    }

    getConfig(): any {
        return this.config;
    }

    navigation(): any {
        return new Navigation(this);
    }
    // ...
}



(window as any).Luigi = new Luigi();

(window as any).Luigi.bootstrap = (connector: any) => {
    let app = new App({
        target: document.body
    });
    (window as any).Luigi._connector = connector;
}
