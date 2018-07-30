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
    LuigiClient.addInitListener(() => {
      const eventData = LuigiClient.getEventData();
      this.projectId = eventData.currentProject;
      this.preservedViewCallbackContext = eventData.context;
      console.info('project ID as luigi param: ' + eventData.currentProject);
    });

    LuigiClient.addContextUpdateListener(() => {
      const eventData = LuigiClient.getEventData();
      this.projectId = eventData.currentProject;
      console.info(
        'context update: project ID as luigi param: ' +
        eventData.currentProject
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
