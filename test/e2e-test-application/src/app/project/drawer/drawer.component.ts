import { Component, OnInit } from '@angular/core';

import { linkManager, uxManager } from '@luigi-project/client';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  public linkManager = linkManager;
  public uxManager = uxManager;
  public constructor() {}

  public ngOnInit() {}
}
