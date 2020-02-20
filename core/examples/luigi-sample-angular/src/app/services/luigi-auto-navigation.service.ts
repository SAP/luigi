import { Router, NavigationEnd } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { linkManager } from '@kyma-project/luigi-client';

@Injectable({
  providedIn: 'root'
})
export class LuigiAutoNavigationService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {}

  public init(): void {
    const customLocalPrefix = '/nav-sync-example';
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter(ev => ev instanceof NavigationEnd),
          filter(ev => (ev as NavigationEnd).url.startsWith(customLocalPrefix))
        )
        .subscribe((ev: NavigationEnd) => {
          if (ev instanceof NavigationEnd) {
            linkManager()
              .fromClosestContext()
              .withoutSync()
              .navigate(ev.url.substr(customLocalPrefix.length));
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
