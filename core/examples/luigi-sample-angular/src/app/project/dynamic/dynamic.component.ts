import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import LuigiClient from '@kyma-project/luigi-client';
import {
  LuigiContextService,
  IContextMessage
} from '../../services/luigi-context.service';
import { toTitleCase, slugify } from '../../services/helpers';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit, OnDestroy {
  public luigiClient: LuigiClient = LuigiClient;
  public pathParams: { [key: string]: string };
  public nodeLabel: string;
  public links: string[];
  public hasBack: boolean;
  public nodeParams: any = null;
  public callbackValue = 'default value';
  private lcSubscription: Subscription;

  constructor(
    private luigiService: LuigiContextService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.lcSubscription = this.luigiService
      .getContext()
      .subscribe((ctx: IContextMessage) => {
        if (!ctx.context) {
          console.warn(
            'To use this component properly, node configuration requires context.label to be defined. context.links can be defined as array of strings to generate links to children'
          );
          return;
        }

        const lastPathParam = Object.values(
          LuigiClient.getPathParams() || {}
        ).pop();

        // We can directly access our specified context values here
        this.nodeLabel = toTitleCase(ctx.context.label || lastPathParam);
        this.links = ctx.context.links;

        // preserveView and node params
        this.hasBack = LuigiClient.linkManager().hasBack();
        this.nodeParams =
          Object.keys(LuigiClient.getNodeParams()).length > 0
            ? LuigiClient.getNodeParams()
            : null;

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

  public slugify(str: string): string {
    return slugify(str);
  }

  public goBack() {
    // going back with some sample callback context,
    // that will be handed over to previous view
    this.luigiClient.linkManager().goBack(this.callbackValue);
  }
}
