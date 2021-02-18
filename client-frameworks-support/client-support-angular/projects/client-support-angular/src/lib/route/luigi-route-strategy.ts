import { BaseRouteReuseStrategy } from '@angular/router';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { LuigiActivatedRouteSnapshotHelper } from './luigi-activated-route-snapshot-helper';

export class LuigiRouteStrategy extends BaseRouteReuseStrategy {
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    LuigiActivatedRouteSnapshotHelper.setCurrent(route);
    return super.retrieve(route);
  }
}
