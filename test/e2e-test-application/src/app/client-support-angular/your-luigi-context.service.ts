import { Injectable, NgZone } from '@angular/core';
import { LuigiContextServiceImpl } from '@luigi-project/client-support-angular'

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
