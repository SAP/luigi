import { ActivatedRouteSnapshot } from '@angular/router';

export class LuigiActivatedRouteSnapshotHelper {
  // tslint:disable-next-line:variable-name
  private static _current: ActivatedRouteSnapshot = (null as unknown) as ActivatedRouteSnapshot;

  static getCurrent(): ActivatedRouteSnapshot {
    return LuigiActivatedRouteSnapshotHelper._current;
  }

  static setCurrent(current: ActivatedRouteSnapshot): void {
    LuigiActivatedRouteSnapshotHelper._current = current;
  }
}
