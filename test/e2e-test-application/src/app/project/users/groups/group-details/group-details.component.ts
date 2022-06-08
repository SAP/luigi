import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { getPathParams, linkManager } from '@luigi-project/client';
import { NgZone } from '@angular/core';

import { LuigiContextService, IContextMessage } from '../../../../services/luigi-context.service';
import { toTitleCase } from '../../../../services/helpers';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  public linkManager = linkManager;
  public pathParams: { [key: string]: string };
  public groupLabel: string;
  private lcSubscription: Subscription;
  public currentRoute: string;

  constructor(private luigiService: LuigiContextService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.lcSubscription = this.luigiService.getContext().subscribe((ctx: IContextMessage) => {
      // We can directly access our custom specified context value here
      this.groupLabel = toTitleCase(ctx.context.currentGroup);

      // Default way, if context is not specified in node configuration
      this.pathParams = getPathParams();
      this.groupLabel = this.pathParams && this.pathParams.group && toTitleCase(this.pathParams.group);

      linkManager()
        .fromContext('project')
        .getCurrentRoute()
        .then(route => {
          this.currentRoute = route;
          console.log('route', route);
        });

      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.lcSubscription) {
      this.lcSubscription.unsubscribe();
    }
  }

  getCurrentRoute() {
    linkManager()
      .fromContext('project')
      .getCurrentRoute()
      .then(route => {
        this.currentRoute = route;
        console.log('route', route);
      });
  }
}
