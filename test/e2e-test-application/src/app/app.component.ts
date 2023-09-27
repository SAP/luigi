import { LuigiAutoNavigationService } from './services/luigi-auto-navigation.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {
  sendCustomMessage,
  addInactiveListener
} from '@luigi-project/client';
import { LuigiContextService } from '@luigi-project/client-support-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'app';

  constructor(private luigiService: LuigiContextService, private luigiAutoNav: LuigiAutoNavigationService) { }

  ngOnInit() {
    this.luigiService.contextObservable().subscribe((ctxObj) => {
      if (ctxObj.contextType === 0) {
        this.luigiAutoNav.init();
        sendCustomMessage({ id: 'my-micro-frontend-is-ready' });
      }
    });


    addInactiveListener(() => {
      console.debug('inactiveListener: micro frontend is now in the background');
    });
  }

}
