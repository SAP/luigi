import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-client-support-angular',
  templateUrl: './luigi.preload.component.html',
  styles: []
})
export class LuigiPreloadComponent implements OnInit {
  constructor() {}
  routeExampleVirtual: string =
    "  {path: 'ng-luigi-demo', component: NgLuigiDemoComponent, data: {fromVirtualTreeRoot: true}}";
  routeExampleReuse: string =
    "  {path: 'ng-luigi-demo', component: NgLuigiDemoComponent, data: {reuse: true}}";
  ngOnInit(): void {}
}
