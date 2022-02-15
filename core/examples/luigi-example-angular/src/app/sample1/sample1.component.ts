import { Component } from '@angular/core';
import { linkManager } from '@luigi-project/client';

@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html'
})
export class Sample1Component {
  constructor() {}

  openModal() {
    linkManager().openAsModal('/home');
  }

  // goTo() {
  //   linkManager().updateModalPathInternalNavigation('/mfe', {}, 'sessionId');
  // }
}
