import { Component } from '@angular/core';
import {
  isLuigiClientInitialized,
  luigiClientInit,
} from '@luigi-project/client';


@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html'
})
export class Sample1Component {
  constructor() {
    console.log("constructor");
  }

  ngOnInit() {
    console.log("initialized value=", isLuigiClientInitialized());

    setTimeout(() => { 
      luigiClientInit();

      setTimeout(() => { 
        console.log("post value", isLuigiClientInitialized());
      }, 1000);

    }, 3000);
  }
  
}
