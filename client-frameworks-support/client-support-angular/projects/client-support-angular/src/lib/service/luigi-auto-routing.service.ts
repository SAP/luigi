import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { linkManager } from '@luigi-project/client';
import { filter } from 'rxjs/operators';
import { LuigiActivatedRouteSnapshotHelper } from '../route/luigi-activated-route-snapshot-helper';

@Injectable({
  providedIn: 'root'
})
export class LuigiAutoRoutingService implements OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private router: Router) {
    this.subscription.add(
      this.router.events.pipe(this.doFilter()).subscribe(this.doSubscription)
    );
  }

  doFilter() {
    return filter(event => {
      return (
        event instanceof NavigationEnd &&
        event.url &&
        event.url.length > 0 &&
        !(history.state && history.state.luigiInduced)
      );
    });
  }

  /**
   * This method will be take in consideration angular route that having in data object the paramter fromVirtualTreeRoot: true, here an example:
   * {path: 'demo', component: DemoComponent, data:{fromVirtualTreeRoot: true}}
   * Another option is to specify the LuigiPath: if you add in route data luigiRoute:'/xxxx/xxx'; in the case we will update the path in LuigiCore navigation, here an example
   * {path: 'demo', component: DemoComponent, data:{luigiRoute: '/home/demo''}}
   * @param event
   */
  doSubscription(event: NavigationEnd) {
    let current = LuigiActivatedRouteSnapshotHelper.getCurrent();
    if (current.data.luigiRoute) {
      linkManager()
        .withoutSync()
        .navigate(current.data.luigiRoute);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
