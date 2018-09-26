import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import LuigiClient from '@kyma-project/luigi-client';

import { LuigiContextService, IContextMessage } from '../../../../../services/luigi-context.service';
import { Subscription } from 'rxjs';
import { toTitleCase } from '../../../../../services/helpers';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, OnDestroy {
  public luigiClient: LuigiClient = LuigiClient;
  public pathParams: { [key: string]: string };
  public groupLabel: string;
  private lcSubscription: Subscription;

  constructor(private luigiService: LuigiContextService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.lcSubscription = this.luigiService.getContext().subscribe((ctx: IContextMessage) => {
      this.pathParams = this.luigiClient.getPathParams();
      this.groupLabel = this.pathParams && this.pathParams.group && toTitleCase(this.pathParams.group);
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    if (this.lcSubscription) {
      this.lcSubscription.unsubscribe();
    }
  }
}
