import { mount } from 'svelte';
import App from './App.svelte';
import { Navigation } from './core-api/navigation';
import { Routing } from './routing';
import type { LuigiConnector } from './types/connector';
import { UI } from './ui';
import { Communication } from './communicaton';
import { UX } from './core-api/ux';

const _init = () => {
  const luigi = (window as any).Luigi;
  Routing.init(luigi);
  UI.init(luigi);
  Communication.init(luigi);
};

export class Luigi {
  config: any;

  _connector: LuigiConnector | undefined;
  _app: any;
  _ui = UI;
  _comm = Communication;
  _ux = UX;

  bootstrap(connector: LuigiConnector): void {
    this._app = mount(App, {
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

  ux = (): any => {
    return new UX(this);
  };
  // ...
}
