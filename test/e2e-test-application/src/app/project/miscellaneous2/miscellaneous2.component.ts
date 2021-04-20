import { Component, OnInit } from '@angular/core';

import { uxManager } from '@luigi-project/client';

@Component({
  selector: 'app-miscellaneous2',
  templateUrl: './miscellaneous2.component.html',
  styleUrls: ['./miscellaneous2.component.css']
})
export class Miscellaneous2Component implements OnInit {
  constructor() { }

  ngOnInit() { }

  openConfirmationModal() { uxManager().showConfirmationModal({ body: 'Just a confirmation modal' }).then(() => console.log('opended a confirmation modal')) }
}
