import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import LuigiClient from '@kyma-project/luigi-client';
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
  public luigiClient: LuigiClient = LuigiClient;
  public title = 'app';

  constructor(private luigiService: LuigiContextService) {}

  ngOnInit() {
    this.luigiClient.addInitListener(context =>
      this.onLuigiContext('init', context)
    );
    this.luigiClient.addContextUpdateListener(context =>
      this.onLuigiContext('update', context)
    );
  }

  private onLuigiContext(contextType: ILuigiContextTypes, context: any): void {
    this.luigiService.setContext({ contextType, context });
  }
}
