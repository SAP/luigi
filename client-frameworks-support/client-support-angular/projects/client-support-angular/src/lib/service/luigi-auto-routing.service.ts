import { Injectable, OnDestroy } from '@angular/core';
import { OperatorFunction, PartialObserver, Subscription } from 'rxjs';
import { convertToParamMap, NavigationEnd, ParamMap, Router, RouterEvent } from '@angular/router';
import { linkManager, uxManager } from '@luigi-project/client';
import { filter } from 'rxjs/operators';
import { LuigiActivatedRouteSnapshotHelper } from '../route/luigi-activated-route-snapshot-helper';
import { LuigiContextService } from './luigi-context-service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LuigiAutoRoutingService implements OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private luigiContextService: LuigiContextService) {
    this.subscription.add(
      this.router.events.pipe(this.doFilter()).subscribe(this.doSubscription.bind(this) as () => void)
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
   * If updateModalPathParam is specified, than modalPathParam will be updated upon internal navigation:
   * {path: 'demo', component: DemoComponent, data:{updateModalPathParam: true}}
   * @param event the NavigationEnd event
   */
  doSubscription(event: NavigationEnd): void {
    let current: ActivatedRouteSnapshot | null = LuigiActivatedRouteSnapshotHelper.getCurrent();

    if (!current) {
      current = this.router.routerState.root.snapshot;
      while (current?.children?.length > 0) {
        // handle multiple children
        let primary: ActivatedRouteSnapshot | null = null;

        current?.children.forEach(childSnapshot => {
          if (childSnapshot.outlet === 'primary') {
            primary = childSnapshot;
          }
        });
        if (primary) {
          current = primary;
        } else if (current.firstChild) {
          current = current.firstChild;
        } else {
          break;
        }
      }
    }
    if (current?.data) {
      const ux = uxManager();
      let lm = linkManager().withoutSync();
      let route: string | undefined;

      if (current.data.luigiRoute) {
        route = current.data.luigiRoute;

        if (current.params) {
          const pmap: ParamMap = convertToParamMap(current.params);
          pmap.keys.forEach(key => {
            const val = pmap.getAll(key).forEach(param => {
              route = route?.replace(':' + key, param);
            });
          });
        }
        if (current.data.fromContext) {
          if (!this.luigiContextService.getContext()) {
            console.debug('Ignoring auto navigation request, luigi context not set');
            return;
          }
          if (current.data.fromContext === true) {
            lm = lm.fromClosestContext();
          } else {
            lm = lm.fromContext(current.data.fromContext);
          }
        }
      } else if (current.data.fromVirtualTreeRoot) {
        let url = event.url;
        const truncate = current.data.fromVirtualTreeRoot.truncate;
        if (truncate) {
          if (truncate.indexOf('*') === 0) {
            const index = url.indexOf(truncate.substr(1));
            url = url.substr(index + truncate.length - 1);
          } else if (url.indexOf(truncate) === 0) {
            url = url.substr(truncate.length);
          }
        }
        route = url;
        console.debug('Calling fromVirtualTreeRoot for url ==> ' + route);
        lm = lm.fromVirtualTreeRoot();
      }

      if (ux.isModal()) {
        if (current.data.updateModalDataPath) {
          lm.updateModalPathInternalNavigation(route as string, {}, current.data.addHistoryEntry);
        }
      } else if (route) {
        lm.navigate(route);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
