import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  linkManager,
  uxManager,
  addContextUpdateListener,
  removeContextUpdateListener
} from '@kyma-project/luigi-client';
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
  public linkManager = linkManager;
  public uxManager = uxManager;
  public projectId: string;
  public modalActive = false;
  public preservedViewCallbackContext: any;
  private lcSubscription: Subscription;
  private cudListener: string;
  public pathExists: { formValue: string; result: boolean | null };
  public confirmationModalResult: '' | 'confirmed' | 'dismissed';
  public alertDismissed;
  public alertTypes = ['success', 'info', 'warning', 'error'];
  public isDirty = false;

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
      const removed = removeContextUpdateListener(this.cudListener);
    }
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

    // Decentralized approach, using LuigiClient listeners directly
    //
    this.cudListener = addContextUpdateListener(updatedContext => {
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
    const settings = {
      // header: 'Modal Header - Luigi modal',
      body: `Lorem tipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      buttonConfirm: 'Confirm',
      buttonDismiss: 'Cancel'
    };

    uxManager()
      .showConfirmationModal(settings)
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
    const { type, links, text } = this.luigiAlertForm.value;

    this.alertDismissed = text ? false : undefined;

    const texts = {
      withoutLink: `<b onmouseover=alert('Wufff!')>click me!</b> Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      withLink: `Ut enim ad minim veniam, {goToHome} quis nostrud exercitation
        ullamco {relativePath} laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor {goToOtherProject} in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    };
    const exampleLinks = {
      goToHome: { text: 'homepage', url: '/overview' },
      goToOtherProject: { text: 'other project', url: '/projects/pr2' },
      relativePath: { text: 'relative hide side nav', url: 'hideSideNav' }
    };

    const textData = !text ? '' : links ? texts.withLink : texts.withoutLink;
    const linkData = links ? exampleLinks : undefined;

    const settings = {
      text: textData,
      type,
      links: linkData
    };

    uxManager()
      .showAlert(settings)
      .then(() => {
        this.alertDismissed = true;
      });
  }

  checkIfPathExists() {
    linkManager()
      .pathExists(this.pathExists.formValue)
      .then((pathExists: boolean) => {
        this.pathExists.result = pathExists;
        this.cdr.detectChanges();
      });
  }

  resetPathExistsResult() {
    this.pathExists.result = undefined;
  }

  public sendDirtyEvent = () => {
    uxManager().setDirtyStatus(this.isDirty);
  };
}
