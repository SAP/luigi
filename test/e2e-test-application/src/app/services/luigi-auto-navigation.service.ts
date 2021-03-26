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
    const customLocalPrefix = 'settings';
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter(ev => ev instanceof NavigationEnd),
          filter(ev => (ev as NavigationEnd).url.includes(customLocalPrefix))
        )
        .subscribe((ev: NavigationEnd) => {
          if (ev instanceof NavigationEnd) {
            linkManager()
              .fromVirtualTreeRoot()
              .withoutSync()
              .navigate(ev.url);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
