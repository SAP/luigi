import { Router, NavigationEnd } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { linkManager } from '@luigi-project/client';

@Injectable({
  providedIn: 'root'
})
export class LuigiAutoNavigationService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {}

  public init(): void {
    const customLocalPrefix = '/internal/virtualTree';
    const customLocalPrefixNavSync = '/nav-sync-example';
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter(ev => ev instanceof NavigationEnd),
          filter(
            ev => (ev as NavigationEnd).url.startsWith(customLocalPrefix) ||
            (ev as NavigationEnd).url.startsWith(customLocalPrefixNavSync)
          )
        )
        .subscribe((ev: NavigationEnd) => {
          if (ev instanceof NavigationEnd) {
            if (ev.url.startsWith(customLocalPrefix)) {
              linkManager()
                .fromVirtualTreeRoot()
                .withoutSync()
                .navigate(ev.url);
            } else {
              linkManager()
                .fromClosestContext()
                .withoutSync()
                .navigate(ev.url.substr(customLocalPrefixNavSync.length));
            }
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
