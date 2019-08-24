import { Component, OnInit } from '@angular/core';
import {
  linkManager,
  uxManager,
  sendCustomMessage,
  addCustomMessageListener
} from '@kyma-project/luigi-client';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public linkManager = linkManager;

  public luigiClientItems: any[] = [
    {
      clickHandler: () => {
        this.linkManager().navigate('/projects/pr1');
      },
      text: 'uxManager()',
      description: 'backdrop, confirmation modal, alerts and more'
    },
    {
      clickHandler: () => {
        this.linkManager().navigate('/ext');
      },
      text: 'uxManager()',
      description: 'loading indicator'
    },
    {
      clickHandler: () => {
        this.linkManager().navigate('/projects/pr2');
      },
      text: 'linkManager()',
      description: 'navigation methods'
    },
    {
      clickHandler: () => {
        this.sendCustomMessageToCore();
      },
      text: 'sendCustomMessage()',
      description:
        'send a custom message that will execute some logic on the Luigi Core app if that app is properly configured for that'
    }
  ];

  public luigiCoreLinks: any[] = [
    {
      link: '/projects/pr1/dps',
      text: 'defaultChildNode',
      description:
        'navigation node configuration to set a specific node as an initial target'
    },
    {
      link: '/projects/pr1/users/groups',
      text: 'dynamic nodes',
      description:
        'navigation node configuration to set a specific node as dynamic'
    },
    {
      link: '/projects/pr1',
      text: 'external URL node',
      description:
        'navigation node configuration to direct to an external website'
    },
    {
      link: '/projects/pr1/avengers',
      text: 'keepSelectedForChildren',
      description:
        'navigation node configuration to focus on a navigation menu and omit the children'
    },
    {
      link: '/projects/pr2',
      text: 'Node with link to another node',
      description: 'navigation node configuration to redirect to another path'
    },
    {
      link: '/projects/pr1/on-node-activation',
      text: 'Navigation node with node activation hook',
      description:
        'The navigation is not triggered when the method returns either false or a promise that resolves to false'
    }
  ];

  public isDirty = false;

  ngOnInit() {
    addCustomMessageListener(
      'luigi.my-custom-message-for-client',
      (customMessage, listenerId) => {
        // TODO: remove or comment before merging, use only for reviewing purposes
        console.log('Received Custom Message', customMessage, listenerId);
      }
    );
  }

  public sendDirtyEvent() {
    uxManager().setDirtyStatus(this.isDirty);
  }

  public updateBadgeCounters() {
    window.parent.postMessage(
      { msg: 'luigi.navigation.update-badge-counters' },
      '*'
    );
  }

  public sendCustomMessageToCore() {
    sendCustomMessage({ id: 'luigi.my-custom-message' });
  }
}
