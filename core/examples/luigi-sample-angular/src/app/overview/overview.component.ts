import { Component, OnInit } from '@angular/core';
import LuigiClient from '@kyma-project/luigi-client';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  public luigiClient: LuigiClient;
  public luigiClientLinks: any[] = [
    {
      link: '/projects/pr2',
      text: 'uxManager()',
      description: 'backdrop methods'
    },
    {
      link: '/projects/pr2',
      text: 'linkManager()',
      description: 'navigation methods'
    }
  ];

  public luigiCoreLinks: any[] = [
    {
      link: '/projects/pr2/dps',
      text: 'defaultChildNode',
      description: 'navigation node configuration to set a specific node as initial target'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.luigiClient = LuigiClient;
  }
}
