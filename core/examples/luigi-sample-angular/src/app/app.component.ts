import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  addInitListener,
  addContextUpdateListener,
  afterInit
} from '@kyma-project/luigi-client';
import {
  LuigiContextService,
  ILuigiContextTypes
} from './services/luigi-context.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'app';

  constructor(private luigiService: LuigiContextService) {}

  ngOnInit() {
    addInitListener(context => this.onLuigiContext('init', context));
    addContextUpdateListener(context => this.onLuigiContext('update', context));
  }

  private onLuigiContext(contextType: ILuigiContextTypes, context: any): void {
    this.luigiService.setContext({ contextType, context });
    if (contextType == 'init') {
      setTimeout(() => {
        afterInit();
      }, 1000);
    }
  }
}
