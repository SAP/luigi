import { Component } from '@angular/core';
import { linkManager, setTargetOrigin } from '@luigi-project/client';

@Component({
  selector: 'app-sample2',
  templateUrl: './sample2.component.html'
})
export class Sample2Component {
  constructor() {}

  openModal() {
    linkManager().openAsModal('/sample2');
    setTargetOrigin('http://localhost:4200');
  }

  goTo() {
    linkManager().updateModalPathInternalNavigation('sample1');
  }
}
