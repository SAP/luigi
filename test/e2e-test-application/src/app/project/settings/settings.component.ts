import {
  LuigiContextService,
  IContextMessage
} from '../../services/luigi-context.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  addInitListener,
  linkManager,
  getNodeParams,
  NodeParams,
  uxManager,
  getActiveFeatureToggles
} from '@luigi-project/client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public linkManager = linkManager;
  public uxManager = uxManager;
  projectId: string;
  groupId: string;
  hasBack: boolean;
  isModal: boolean;
  nodeParams: NodeParams = null;
  callbackValue = 'default value';
  lcSubscription: Subscription;
  preservedViewCallbackContext: any;
  private testFeatureToggleActive = false;

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

    addInitListener(init => {
      this.hasBack = linkManager().hasBack();
      this.isModal = uxManager().isModal();
      this.nodeParams =
        Object.keys(getNodeParams()).length > 0 ? getNodeParams() : null;
      let featureToggleList = getActiveFeatureToggles();
      if (featureToggleList.includes('ft1')) {
        this.testFeatureToggleActive = true;
      }
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
          this.nodeParams =
            Object.keys(getNodeParams()).length > 0 ? getNodeParams() : null;
          // Since Luigi runs outside of Zone.js, changes need
          // to be updated manually
          // Be sure to check for destroyed ChangeDetectorRef,
          // else you get runtime Errors
          if (uxManager().isSplitView()) {
            console.info(
              'uxManager().isSplitView(): micro frontend is running inside a split view'
            );
          }
          if (uxManager().isModal()) {
            console.info(
              'uxManager().isModal(): micro frontend is running inside a modal'
            );
          }
          if (!this.cdr['destroyed']) {
            this.cdr.detectChanges();
          }
        }
      });
  }

  goBack() {
    // going back with some sample callback context,
    // that will be handed over to previous view
    linkManager().goBack(this.callbackValue);
  }
}
