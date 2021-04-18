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

  test() { uxManager().showConfirmationModal({ body: 'asdf' }).then(() => { console.log('test'); }) }
}
