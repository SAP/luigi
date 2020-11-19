import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle
} from '@angular/router';
import { LuigiActivatedRouteSnapshotHelper } from './luigi-activated-route-snapshot-helper';

export class LuigiReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    let shouldReuse = false;
    console.debug('checking if this route should be re used or not', route);
    if (route.routeConfig.data) {
      route.routeConfig.data.reuse
        ? (shouldReuse = true)
        : (shouldReuse = false);
    }

    return shouldReuse;
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    console.debug('storing handler');
    if (handler) {
      this.handlers[this.getUrl(route)] = handler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.debug('checking if it should be re attached');
    return !!this.handlers[this.getUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    LuigiActivatedRouteSnapshotHelper.setCurrent(route);
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return (null as unknown) as DetachedRouteHandle;
    }

    return this.handlers[this.getUrl(route)];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    let reUseUrl = false;
    if (future.routeConfig) {
      if (future.routeConfig.data) {
        reUseUrl = future.routeConfig.data.reuse;
      }
    }
    const defaultReuse = future.routeConfig === current.routeConfig;
    //return reUseUrl || defaultReuse;
    return defaultReuse;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig) {
      const url = route.routeConfig.path;
      console.debug('returning url', url);
      return url as string;
    }
    return (null as unknown) as string;
  }
}
