import { Component } from '@angular/core';
import { linkManager } from '@kyma-project/luigi-client';

@Component({
  selector: 'app-on-node-activation',
  templateUrl: './onNodeActivation.component.html',
  styleUrls: ['./onNodeActivation.component.css']
})
export class OnNodeActivationComponent {
  public linkManager = linkManager;
}
