import { Injectable, NgZone } from '@angular/core';
import { Context } from '@luigi-project/client';
import { LuigiContextServiceImpl } from '@luigi-project/client-support-angular/luigi-project-client-support-angular';
import { Observable, ReplaySubject } from 'rxjs';

export type ILuigiContextTypes = 'init' | 'update';
export interface IContextMessage {
  contextType: ILuigiContextTypes; // will be init or update
  context: Context;
}

@Injectable({
  providedIn: 'root'
})
export class YourLuigiContextService extends LuigiContextServiceImpl {
  constructor() {
    const zone = new NgZone({});
    super(zone);
  }

  //your implementation of LuigiContextService here
}
