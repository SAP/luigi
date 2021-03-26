import { LuigiAutoNavigationService } from './services/luigi-auto-navigation.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  addInitListener,
  addContextUpdateListener,
  sendCustomMessage,
  addInactiveListener
} from '@luigi-project/client';
import { LuigiContextService, ILuigiContextTypes } from './services/luigi-context.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'app';

  constructor(private luigiService: LuigiContextService, private luigiAutoNav: LuigiAutoNavigationService) {}

  ngOnInit() {
    addInitListener(context => {
      this.onLuigiContext('init', context);
      this.luigiAutoNav.init();
    });
    addContextUpdateListener(context => {
      this.onLuigiContext('update', context);
      console.log('CONTEXT APP = ', context);
    });

    addInactiveListener(() => {
      console.debug('inactiveListener: micro frontend is now in the background');
    });
  }

  private onLuigiContext(contextType: ILuigiContextTypes, context: any): void {
    this.luigiService.setContext({ contextType, context });
    if (contextType === 'init') {
      sendCustomMessage({ id: 'my-micro-frontend-is-ready' });
    }
  }
}
