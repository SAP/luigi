import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart, RouterEvent } from '@angular/router';
import { linkManager } from '@luigi-project/client';
import { filter } from 'rxjs/operators';

export interface IRouteMappingEntry {
    path: string;
    luigiRoute: string;
}

export interface IRoutingConfig {
    useVirtualTree?: boolean;
    routeMapping: IRouteMappingEntry[];
}

@Injectable({
    providedIn: 'root',
})
export class LuigiAutoRoutingService implements OnDestroy {
    private subscription: Subscription = new Subscription();
    private routingConfig: IRoutingConfig = null as unknown as IRoutingConfig;
    private routeMap: Map<string, IRouteMappingEntry> = new Map();

    constructor(private router: Router) {
        this.router.events
            .pipe(
                filter((ev): ev is RouterEvent => ev instanceof NavigationStart),
                filter((ev: NavigationStart) => ev.url?.length > 0),
                filter(() => !(history.state && history.state.luigiInduced))
            )
            .subscribe((ev) => {
                const route = this.routeMap.get(ev.url);
                if (route) {
                    linkManager().withoutSync().navigate(route.luigiRoute);
                } else if (this.routingConfig?.useVirtualTree) {
                    linkManager()
                        .fromVirtualTreeRoot()
                        .withoutSync()
                        .navigate(ev.url);
                }
            });
    }

    public setConfig(routingConfig: IRoutingConfig): void {
        this.routingConfig = routingConfig;
        this.routeMap.clear();
        if (routingConfig.routeMapping) {
            this.routeMap = new Map(routingConfig.routeMapping.map((e: IRouteMappingEntry, i) => [e.path, e]));
            routingConfig.routeMapping.forEach(entry => {
                this.routeMap.set(entry.path, entry);
            });
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
