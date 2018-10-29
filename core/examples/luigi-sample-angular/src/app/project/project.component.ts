import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import LuigiClient from '@kyma-project/luigi-client';
import {
  IContextMessage,
  LuigiContextService
} from '../services/luigi-context.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  public projectId: string;
  public luigiClient: LuigiClient;
  public modalActive = false;
  public preservedViewCallbackContext: any;
  private lcSubscription: Subscription;
  public pathExists: { formValue: string; result: boolean | null };

  public constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private luigiService: LuigiContextService
  ) {
    this.pathExists = {
      formValue: '/projects/pr2',
      result: null
    };
  }

  ngOnDestroy() {
    if (this.lcSubscription) {
      this.lcSubscription.unsubscribe();
    }
  }

  public ngOnInit() {
    // Centralized approach of LuigiClient.addContextUpdateListener
    this.lcSubscription = this.luigiService
      .getContext()
      .subscribe((ctx: IContextMessage) => {
        if (ctx.contextType === 'init' || ctx.contextType === 'update') {
          this.projectId = ctx.context.currentProject;
          console.info(
            'project ID as luigi param: ' + ctx.context.currentProject
          );
          this.preservedViewCallbackContext = ctx.context.goBackContext;
          console.info(
            'context update: project ID as luigi param: ' +
              ctx.context.currentProject,
            'goBackContext?',
            this.preservedViewCallbackContext
          );
          // Since Luigi runs outside of Zone.js, changes need
          // to be updated manually
          // Be sure to check for destroyed ChangeDetectorRef,
          // else you get runtime Errors
          if (!this.changeDetector['destroyed']) {
            this.changeDetector.detectChanges();
          }
        }
      });

    this.activatedRoute.params.subscribe((params: Params) => {
      console.info('project ID as URL param: ' + params['projectId']);
      this.projectId = params['projectId'];
    });

    this.luigiClient = LuigiClient;

    // Only one contextListener allowed per microfrontend, better rely on centralized approach.
    // Take a look at ngOnInit in this component and app.component.ts where we set the listeners.
    //
    // LuigiClient.addContextUpdateListener(updatedContext => {
    //   this.projectId = updatedContext.currentProject;
    //   this.preservedViewCallbackContext = updatedContext.goBackContext;
    //   console.info(
    //     'context update: project ID as luigi param: ' +
    //     updatedContext.currentProject,
    //     'goBackContext?',
    //     this.preservedViewCallbackContext
    //   );

    //   // Be sure to check for destroyed ChangeDetectorRef,
    //   // else you get runtime Errors
    //   if (!(this.changeDetector['destroyed'])) {
    //     this.changeDetector.detectChanges();
    //   }
    // });
  }

  toggleModal() {
    this.modalActive = !this.modalActive;
  }

  checkIfPathExists() {
    this.luigiClient
      .linkManager()
      .pathExists(this.pathExists.formValue)
      .then((pathExists: boolean) => {
        this.pathExists.result = pathExists;
        this.changeDetector.detectChanges();
      });
  }
}
