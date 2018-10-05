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
      description: 'navigation Node configuration to set a specific node as initial target'
    },
    {
      link: '/projects/pr1/users/groups',
      text: 'dynamic Nodes',
      description: 'navigation Node configuration to set a specific node as dynamic'
    }
  ];
}
