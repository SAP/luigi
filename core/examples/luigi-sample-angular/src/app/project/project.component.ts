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

  public constructor(private activatedRoute: ActivatedRoute) {
    LuigiClient.addInitListener(() => {
      const eventData = LuigiClient.getEventData();
      this.projectId = eventData.currentProject;
      console.info('project ID as luigi param: ' + eventData.currentProject);
    });

    // Available luigi-client newer than 0.0.9
    if (typeof LuigiClient.addContextUpdateListener === 'function') {
      LuigiClient.addContextUpdateListener(() => {
        const eventData = LuigiClient.getEventData();
        this.projectId = eventData.currentProject;
        console.info(
          'context update: project ID as luigi param: ' +
            eventData.currentProject
        );
      });
    } else {
      console.info(
        'luigiClient.addContextUpdateListener does not exist, consider upgrading luigi-client!'
      );
    }
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
