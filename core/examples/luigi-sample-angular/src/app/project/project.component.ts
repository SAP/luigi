import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import LuigiClient from '@kyma-project/luigi-client';
import {
  IContextMessage,
  LuigiContextService
} from '../services/luigi-context.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  @ViewChild('luigiAlertForm') luigiAlertForm: NgForm;
  public projectId: string;
  public luigiClient: LuigiClient;
  public modalActive = false;
  public preservedViewCallbackContext: any;
  private lcSubscription: Subscription;
  private cudListener: string;
  public pathExists: { formValue: string; result: boolean | null };
  public confirmationModalResult: '' | 'confirmed' | 'dismissed';
  public alertDismissed;
  public alertTypes = ['success', 'info', 'warning', 'error'];

  public constructor(
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
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
    if (this.cudListener) {
      const removed = this.luigiClient.removeContextUpdateListener(
        this.cudListener
      );
    }
  }

  public ngOnInit() {
    // We suggest to use a centralized approach of LuigiClient.addContextUpdateListener
    // Take a look at ngOnInit in this component and app.component.ts where we set the listeners.
    this.lcSubscription = this.luigiService
      .getContext()
      .subscribe((ctx: IContextMessage) => {
        if (ctx.contextType === 'init' || ctx.contextType === 'update') {
          this.projectId = ctx.context.currentProject;
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

    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
    });

    this.luigiClient = LuigiClient;

    // Decentralized approach, using LuigiClient listeners directly
    //
    this.cudListener = LuigiClient.addContextUpdateListener(updatedContext => {
      // this.projectId = updatedContext.currentProject;
      // this.preservedViewCallbackContext = updatedContext.goBackContext;

      // Be sure to check for destroyed ChangeDetectorRef,
      // else you get runtime Errors
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  toggleModal() {
    this.modalActive = !this.modalActive;
  }

  showConfirmationModal() {
    this.confirmationModalResult = '';
    const content = {
      // header: 'Modal Header - Luigi modal',
      body: `Lorem tipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      buttonConfirm: 'Confirm',
      buttonDismiss: 'Cancel'
    };
    this.luigiClient
      .uxManager()
      .showConfirmationModal(content)
      .then(
        () => {
          this.confirmationModalResult = 'confirmed';
        },
        () => {
          this.confirmationModalResult = 'dismissed';
        }
      );
  }

  showAlert() {
    this.alertDismissed = false;
    const texts = {
      withoutLink: `<b onmouseover=alert('Wufff!')>click me!</b> Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      withLink: `<b onmouseover=alert('Wufff!')>click me!</b>Ut enim ad minim veniam,
        {goToHome} quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor {goToOtherProject} in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    };
    const exampleLinks = {
      goToHome: { text: 'homepage', url: '/overview' },
      goToOtherProject: { text: 'other project', url: '/projects/pr2' }
    };

    const { type, dismissButton, link } = this.luigiAlertForm.value;
    const textData = link ? texts.withLink : texts.withoutLink;
    const linkData = link ? exampleLinks : undefined;

    const settings = {
      text: textData,
      type,
      dismissButton,
      links: linkData
    };

    this.luigiClient
      .uxManager()
      .showAlert(settings)
      .then(() => {
        this.alertDismissed = true;
      });
  }

  checkIfPathExists() {
    this.luigiClient
      .linkManager()
      .pathExists(this.pathExists.formValue)
      .then((pathExists: boolean) => {
        this.pathExists.result = pathExists;
        this.cdr.detectChanges();
      });
  }

  resetPathExistsResult() {
    this.pathExists.result = undefined;
  }
}
