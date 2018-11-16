import { Component, OnInit } from '@angular/core';
import LuigiClient from '@kyma-project/luigi-client';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  public luigiClient: LuigiClient = LuigiClient;
  public luigiClientLinks: any[] = [
    {
      link: '/projects/pr2',
      text: 'uxManager()',
      description: 'backdrop methods'
    },
    {
      link: '/ext',
      text: 'uxManager()',
      description: 'loading indicator methods'
    },
    {
      link: '/projects/pr2',
      text: 'linkManager()',
      description: 'navigation methods'
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
    }
  ];
}
