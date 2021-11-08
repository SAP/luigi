import { Component, OnInit } from '@angular/core';

import { uxManager, addInitListener, addContextUpdateListener } from '@luigi-project/client';

@Component({
  selector: 'app-miscellaneous2',
  templateUrl: './miscellaneous2.component.html',
  styleUrls: ['./miscellaneous2.component.css']
})
export class Miscellaneous2Component implements OnInit {
  constructor() {}
  consoleText: string = 'InitListener called';

  ngOnInit() {
    addInitListener(context => {
      this.consoleText = 'InitListener called';
    });
    addContextUpdateListener(context => {
      this.consoleText = 'ContextUpdateListener called';
    });
  }

  showConsoleText() {
    return this.consoleText;
  }

  openConfirmationModal() {
    uxManager()
      .showConfirmationModal({ body: 'Just a confirmation modal' })
      .then(() => console.log('opended a confirmation modal'));
  }
}
