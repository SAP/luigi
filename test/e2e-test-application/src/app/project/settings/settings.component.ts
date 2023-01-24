// import { LuigiContextService, IContextMessage } from '../../services/luigi-context.service';
import { LuigiContextService } from '@luigi-project/client-support-angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  linkManager,
  getNodeParams,
  NodeParams,
  uxManager,
  getActiveFeatureToggles,
  getUserSettings
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
  userSettings: object;
  nodeParams: NodeParams = null;
  callbackValue = 'default value';
  lcSubscription: Subscription;
  preservedViewCallbackContext: any;
  testFeatureToggleActive = false;
  currentRouteVirtual: string;
  currentRoute: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private luigiContextService: LuigiContextService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
      this.groupId = params['groupId'];
    });

    this.luigiContextService.contextObservable().subscribe(async ctx => {
      this.hasBack = linkManager().hasBack();
      this.isModal = uxManager().isModal();
      this.userSettings = getUserSettings();
      this.nodeParams = Object.keys(getNodeParams()).length > 0 ? getNodeParams() : null;
      let featureToggleList = getActiveFeatureToggles();
      if (featureToggleList && featureToggleList.includes('ft1')) {
        this.testFeatureToggleActive = true;
      }
      this.preservedViewCallbackContext = ctx.context.goBackContext;
      this.nodeParams = Object.keys(getNodeParams()).length > 0 ? getNodeParams() : null;
      // Since Luigi runs outside of Zone.js, changes need
      // to be updated manually
      // Be sure to check for destroyed ChangeDetectorRef,
      // else you get runtime Errors
      if (uxManager().isSplitView()) {
        console.info('uxManager().isSplitView(): micro frontend is running inside a split view');
      }
      if (uxManager().isModal()) {
        console.info('uxManager().isModal(): micro frontend is running inside a modal');
      }
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    // going back with some sample callback context,
    // that will be handed over to previous view
    linkManager().goBack(this.callbackValue);
  }

  getCurrentRouteFromVirtualTree() {
    linkManager()
      .fromVirtualTreeRoot()
      .getCurrentRoute()
      .then(route => {
        this.currentRouteVirtual = route;
      });
  }

  getCurrentRoute() {
    linkManager()
      .getCurrentRoute()
      .then(route => {
        this.currentRoute = route;
      });
  }

  navigateAndShowAlert() {
    linkManager().navigate('/settings', null, true);

    const type: any = 'info';
    setTimeout(() => {
      const settings = {
        text: 'Information alert sent from an inactive iFrame',
        type
      };
      uxManager().showAlert(settings);
    }, 2000);
  }
}
