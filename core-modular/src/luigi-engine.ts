import { mount } from 'svelte';
import App from './App.svelte';
import { Navigation } from './core-api/navigation';
import { RoutingModule } from './modules/routing-module';
import type { LuigiConnector } from './types/connector';
import { UIModule } from './modules/ui-module';
import { CommunicationModule } from './modules/communicaton-module';
import { UX } from './core-api/ux';
import { UXModule } from './modules/ux-module';


export class LuigiEngine {
  config: any;

  _connector: LuigiConnector | undefined;
  _app: any;
  _ui = UIModule;
  _comm = CommunicationModule;
  _ux = UXModule;

  bootstrap(connector: LuigiConnector): void {
    this._app = mount(App, {
      target: document.body
    });
    this._connector = connector;
  }

  init(): void {
    const luigi = (window as any).Luigi;
    RoutingModule.init(luigi);
    UIModule.init(luigi);
    CommunicationModule.init(luigi);
    UXModule.init(luigi);
  };
}
