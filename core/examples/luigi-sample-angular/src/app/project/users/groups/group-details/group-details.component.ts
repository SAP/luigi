import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import LuigiClient from '@kyma-project/luigi-client';

import { LuigiContextService, IContextMessage } from '../../../../services/luigi-context.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit, OnDestroy {
  public luigiClient: LuigiClient = LuigiClient;
  public pathParams: { [key: string]: string };
  public groupLabel: string;
  private lcSubscription: Subscription;

  constructor(private luigiService: LuigiContextService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.lcSubscription = this.luigiService.getContext().subscribe((ctx: IContextMessage) => {
      this.pathParams = this.luigiClient.getPathParams();
      this.groupLabel = this.pathParams.group ? this.toTitleCase(this.pathParams.group) : 'Invalid';
      this.cdr.detectChanges();
    })
  }

  ngOnDestroy() {
    if (this.lcSubscription) {
      this.lcSubscription.unsubscribe();
    }
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
