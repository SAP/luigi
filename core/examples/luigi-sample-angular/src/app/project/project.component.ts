import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { LuigiClient } from '@kyma-project/luigi-client';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  public projectId: string;
  public luigiClient: LuigiClient;
  public modalActive = false;
  public preservedViewCallbackContext: any;

  public constructor(private activatedRoute: ActivatedRoute) {
    LuigiClient.addInitListener(initialContext => {
      this.projectId = initialContext.currentProject;
      console.info(
        'project ID as luigi param: ' + initialContext.currentProject
      );
    });

    LuigiClient.addContextUpdateListener(updatedContext => {
      this.projectId = updatedContext.currentProject;
      this.preservedViewCallbackContext = updatedContext.goBackContext;
      console.info(
        'context update: project ID as luigi param: ' +
          updatedContext.currentProject,
        'goBackContext?',
        this.preservedViewCallbackContext
      );
    });
  }

  public ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.info('project ID as URL param: ' + params['projectId']);
      this.projectId = params['projectId'];
    });
    this.luigiClient = LuigiClient;
  }

  toggleModal() {
    this.modalActive = !this.modalActive;
  }
}
