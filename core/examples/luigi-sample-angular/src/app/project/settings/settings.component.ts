import {
  LuigiContextService,
  IContextMessage
} from './../../services/luigi-context.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import LuigiClient from '@kyma-project/luigi-client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  luigiClient: LuigiClient;
  projectId: string;
  groupId: string;
  hasBack: boolean;
  nodeParams = null;
  callbackValue = 'default value';
  lcSubscription: Subscription;
  preservedViewCallbackContext: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private luigiService: LuigiContextService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
      this.groupId = params['groupId'];
    });
    this.luigiClient = LuigiClient;
    LuigiClient.addInitListener(init => {
      this.hasBack = LuigiClient.linkManager().hasBack();
      this.nodeParams =
        Object.keys(LuigiClient.getNodeParams()).length > 0
          ? LuigiClient.getNodeParams()
          : null;
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });

    // We suggest to use a centralized approach of LuigiClient.addContextUpdateListener
    // Take a look at ngOnInit in this component and app.component.ts where we set the listeners.
    this.lcSubscription = this.luigiService
      .getContext()
      .subscribe((ctx: IContextMessage) => {
        if (ctx.contextType === 'init' || ctx.contextType === 'update') {
          this.preservedViewCallbackContext = ctx.context.goBackContext;

          // Since Luigi runs outside of Zone.js, changes need
          // to be updated manually
          // Be sure to check for destroyed ChangeDetectorRef,
          // else you get runtime Errors
          if (!this.cdr['destroyed']) {
            this.cdr.detectChanges();
          }
        }
      });
  }

  goBack() {
    // going back with some sample callback context,
    // that will be handed over to previous view
    this.luigiClient.linkManager().goBack(this.callbackValue);
  }
}
