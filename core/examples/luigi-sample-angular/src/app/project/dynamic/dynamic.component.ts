import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  getPathParams,
  getNodeParams,
  linkManager,
  lifecycleManager,
  PathParams,
  NodeParams
} from '@kyma-project/luigi-client';

import {
  LuigiContextService,
  IContextMessage
} from '../../services/luigi-context.service';
import { toTitleCase } from '../../services/helpers';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit, OnDestroy {
  public linkManager = linkManager;
  public pathParams: PathParams;
  public nodeLabel: string;
  public links: string[];
  public hasBack: boolean;
  public nodeParams: NodeParams = null;
  public callbackValue = 'default value';

  // routing playground
  public routeUrl: string;
  public mfBasePath = '';
  public showRouting = false;

  private lcSubscription: Subscription = new Subscription();

  constructor(
    private luigiService: LuigiContextService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url =>
      console.log('url', url.map(u => u.path).join('/'))
    );
    this.lcSubscription.add(
      this.luigiService.getContext().subscribe((ctx: IContextMessage) => {
        if (!ctx.context) {
          console.warn(
            `To use this component properly, node configuration requires context.label to be defined.
            context.links can be defined as array of strings to generate links to children`
          );
          return;
        }

        const lastPathParam = Object.values(getPathParams() || {}).pop();
        this.routeUrl = Object.values(getPathParams() || {}).join('/');

        // We can directly access our specified context values here
        this.nodeLabel = toTitleCase(
          ctx.context.label || lastPathParam || 'hello'
        );
        this.links = ctx.context.links;
        this.mfBasePath = ctx.context.mfBasePath;
        this.showRouting = ctx.context.showRouting;
        if (this.showRouting) {
          lifecycleManager().setNavigationSync({
            active: true,
            useHashRouting: true,
            useClosestContext: true,
            localBasePath: this.mfBasePath
          });
        }

        // preserveView and node params
        this.hasBack = linkManager().hasBack();
        this.nodeParams =
          Object.keys(getNodeParams()).length > 0 ? getNodeParams() : null;

        if (!this.cdr['destroyed']) {
          this.cdr.detectChanges();
        }
      })
    );
  }
  goToRoute(route) {
    console.log('goToRoute', this.mfBasePath + route);
    this.router.navigateByUrl(this.mfBasePath + route).then(e => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }
  ngOnDestroy() {
    this.lcSubscription.unsubscribe();
    lifecycleManager().setNavigationSync({ active: false });
  }

  public slugify(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .join('-');
  }

  public goBack() {
    // going back with some sample callback context,
    // that will be handed over to previous view
    linkManager().goBack(this.callbackValue);
  }
}
