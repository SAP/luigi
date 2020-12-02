import { Component, OnInit } from '@angular/core';
import {
  addInitListener,
  addContextUpdateListener,
  getUserSettings
} from '@luigi-project/client';

@Component({
  selector: 'app-miscellaneous2',
  templateUrl: './miscellaneous2.component.html',
  styleUrls: ['./miscellaneous2.component.css']
})
export class Miscellaneous2Component implements OnInit {
  constructor() {}

  ngOnInit() {
    const contextUpdated = () => console.log(getUserSettings());
    addInitListener(contextUpdated);
    addContextUpdateListener(contextUpdated);
  }
}
