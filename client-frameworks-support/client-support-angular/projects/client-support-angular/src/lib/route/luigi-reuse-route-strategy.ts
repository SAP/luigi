import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { LuigiRouteStrategy } from './luigi-route-strategy';

export class LuigiReuseRouteStrategy extends LuigiRouteStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    let shouldReuse = false;
    console.debug('checking if this route should be re used or not', route);
    if (route.routeConfig.data) {
      shouldReuse = !!route.routeConfig.data.reuse;
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
    super.retrieve(route);
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null as unknown as DetachedRouteHandle;
    }

    return this.handlers[this.getUrl(route)];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    const defaultReuse = future.routeConfig === current.routeConfig;
    return defaultReuse;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig) {
      const url = route.routeConfig.path;
      console.debug('returning url', url);
      return url as string;
    }
    return null as unknown as string;
  }
}
