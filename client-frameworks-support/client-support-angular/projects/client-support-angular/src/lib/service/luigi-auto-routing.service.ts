import { Injectable, OnDestroy } from '@angular/core';
import { OperatorFunction, PartialObserver, Subscription } from 'rxjs';
import {
  convertToParamMap,
  NavigationEnd,
  ParamMap,
  Router,
  RouterEvent
} from '@angular/router';
import { linkManager } from '@luigi-project/client';
import { filter } from 'rxjs/operators';
import { LuigiActivatedRouteSnapshotHelper } from '../route/luigi-activated-route-snapshot-helper';
import { LuigiContextService } from './luigi-context-service';

@Injectable({
  providedIn: 'root'
})
export class LuigiAutoRoutingService implements OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private luigiContextService: LuigiContextService
  ) {
    this.subscription.add(
      this.router.events
        .pipe(this.doFilter())
        .subscribe(this.doSubscription.bind(this) as () => void)
    );
  }

  doFilter(): OperatorFunction<unknown, RouterEvent> {
    return filter((event): event is RouterEvent => {
      return !!(
        event instanceof NavigationEnd &&
        event.url &&
        event.url.length > 0 &&
        !(history.state && history.state.luigiInduced)
      );
    });
  }

  /**
   * This method will be take in consideration angular route that having in data object the paramter
   * fromVirtualTreeRoot: true, here an example:
   * {path: 'demo', component: DemoComponent, data:{fromVirtualTreeRoot: true}}
   * Another option is to specify the LuigiPath: if you add in route data luigiRoute:'/xxxx/xxx';
   * in the case we will update the path in LuigiCore navigation, here an example
   * {path: 'demo', component: DemoComponent, data:{luigiRoute: '/home/demo''}}
   * @param event the NavigationEnd event
   */
  doSubscription(event: NavigationEnd): void {
    const current = LuigiActivatedRouteSnapshotHelper.getCurrent();

    if (current.data) {
      if (current.data.luigiRoute) {
        let route = current.data.luigiRoute;

        if (current.params) {
          const pmap: ParamMap = convertToParamMap(current.params);
          pmap.keys.forEach(key => {
            const val = pmap.getAll(key).forEach(param => {
              route = route.replace(':' + key, param);
            });
          });
        }
        let lm = linkManager();
        if (current.data.fromContext) {
          if (!this.luigiContextService.getContext()) {
            console.debug(
              'Ignoring auto navigation request, luigi context not set'
            );
            return;
          }
          if (current.data.fromContext === true) {
            lm = lm.fromClosestContext();
          } else {
            lm = lm.fromContext(current.data.fromContext);
          }
        }

        lm.withoutSync().navigate(route);
        return;
      }
      if (current.data.fromVirtualTreeRoot) {
        console.debug('Calling fromVirtualTreeRoot for ulr ==> ' + event.url);
        linkManager()
          .fromVirtualTreeRoot()
          .withoutSync()
          .navigate(event.url);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
