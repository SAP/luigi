import { Component } from '@angular/core';
import { linkManager } from '@luigi-project/client';

@Component({
  selector: 'app-sample2',
  templateUrl: './sample2.component.html'
})
export class Sample2Component {
  constructor() {}

  openModal() {
    linkManager().openAsModal('/sample2');
  }

  // goTo() {
  //   linkManager().updateModalPathInternalNavigation('/home');
  // }
}
