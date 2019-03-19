import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import LuigiClient from '@kyma-project/luigi-client';

import {
  LuigiContextService,
  IContextMessage
} from '../../../../services/luigi-context.service';
import { toTitleCase } from '../../../../services/helpers';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  public pathParams: { [key: string]: string };
  public groupLabel: string;
  private lcSubscription: Subscription;

  constructor(
    private luigiService: LuigiContextService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.lcSubscription = this.luigiService
      .getContext()
      .subscribe((ctx: IContextMessage) => {
        // We can directly access our custom specified context value here
        this.groupLabel = toTitleCase(ctx.context.currentGroup);

        // Default way, if context is not specified in node configuration
        this.pathParams = LuigiClient.getPathParams();
        this.groupLabel =
          this.pathParams &&
          this.pathParams.group &&
          toTitleCase(this.pathParams.group);

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
}
