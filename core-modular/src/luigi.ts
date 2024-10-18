import App from "./App.svelte";
import { Navigation } from "./navigation";
import { Routing } from "./routing";
import type { LuigiConnector } from "./types/connector";
import { UI } from './ui';

const _init = () => {
    const luigi = (window as any).Luigi;
    Routing.init(luigi);
    UI.init(luigi);
}

export class Luigi {
    config: any;

    _connector: LuigiConnector | undefined;
    _app: App | undefined;
    _ui = UI;


    bootstrap(connector: LuigiConnector): void {
        this._app = new App({
            target: document.body
        });
        this._connector = connector;
    }

    // NOTE: using arrow style functions to have "code completion" in browser dev tools
    setConfig = (cfg: any) => {
        this.config = cfg;
        _init();
    };

    getConfig = (): any => {
        return this.config;
    };

    navigation = (): Navigation => {
        return new Navigation(this);
    };
    // ...
}