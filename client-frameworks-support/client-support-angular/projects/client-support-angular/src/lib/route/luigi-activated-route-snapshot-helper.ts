import { ActivatedRouteSnapshot } from '@angular/router';

export class LuigiActivatedRouteSnapshotHelper {
  private static _current: ActivatedRouteSnapshot;

  static getCurrent(): ActivatedRouteSnapshot {
    return this._current;
  }

  static setCurrent(current: ActivatedRouteSnapshot) {
    this._current = current;
  }
}
