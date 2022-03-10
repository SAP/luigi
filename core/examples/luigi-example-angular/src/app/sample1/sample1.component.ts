import { Component } from '@angular/core';
import { linkManager, setTargetOrigin } from '@luigi-project/client';

@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html'
})
export class Sample1Component {
  constructor() {}

  openModal() {
    linkManager().openAsModal('/sample1');
    setTargetOrigin('http://localhost:4200');
  }

  goTo() {
    linkManager().updateModalPathInternalNavigation('/sample2', '');
  }
}
