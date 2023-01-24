import { LuigiAutoNavigationService } from './services/luigi-auto-navigation.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { sendCustomMessage, addInactiveListener } from '@luigi-project/client';
import { LuigiContextService } from '@luigi-project/client-support-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'app';

  constructor(private luigiContextService: LuigiContextService, private luigiAutoNav: LuigiAutoNavigationService) {}

  ngOnInit() {
    this.luigiContextService.contextObservable().subscribe(async context => {
      if (context && context.contextType === 0) {
        sendCustomMessage({ id: 'my-micro-frontend-is-ready' });
        this.luigiAutoNav.init();
      }
      if (context && context.contextType === 0) {
        console.log('Context changed:', context);
      }
    });

    addInactiveListener(() => {
      console.debug('inactiveListener: micro frontend is now in the background');
    });
  }
}
