import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LuigiClient } from '@kyma-project/luigi-client';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  luigiClient: LuigiClient;
  projectId: string;
  hasBack: boolean;
  callbackValue: string = 'default value';

  constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
    });
    this.luigiClient = LuigiClient;
    LuigiClient.addInitListener(() => {
      this.hasBack = LuigiClient.linkManager().hasBack();
      this.cdr.detectChanges();
    });
  }

  goBack() {
    // going back with some sample callback context,
    // that will be handed over to previous view
    // this.luigiClient.linkManager().goBack(function() { return this.callbackValue; }.bind(this));
    this.luigiClient.linkManager().goBack({ foo: 'bar' });
  }
}
