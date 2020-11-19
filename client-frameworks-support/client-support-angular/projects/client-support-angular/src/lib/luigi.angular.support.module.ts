import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { LuigiReuseStrategy } from './route/luigiReuseStrategy';
import { LuigiPreloadComponent } from './component/luigi.preload.component';
import { LuigiContextService } from './service/luigi-context-service';
import { LuigiContextServiceImpl } from './service/luigi-context.service.impl';
import { LuigiAutoRoutingService } from './service/luigi-auto-routing.service';

export const staticRoutes: Routes = [
  /** here an example if you want to specify that this component is a virtualThree element in Luigi Core navigation*/
  {
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { fromVirtualTreeRoot: true }
  },
  /** here an example if you want to specify that this component it is a luigi component and u want to change the navigation in Luigi core*/
  {
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { luigiRoute: '/home/reload' }
  },
  /** here an example if you want to reuse the component and not recreating every time you navigate to it (a singleton Component) */
  {
    path: 'luigi-client-support-preload=component',
    component: LuigiPreloadComponent,
    data: { reuse: true }
  }
];

@NgModule({
  declarations: [LuigiPreloadComponent],
  imports: [RouterModule.forChild(staticRoutes)],
  providers: [
    {
      provide: LuigiContextService,
      useClass: LuigiContextServiceImpl
    },
    {
      provide: RouteReuseStrategy,
      useClass: LuigiReuseStrategy
    }
  ],
  exports: [LuigiPreloadComponent]
})
export class LuigiAngularSupportModule {
  constructor(
    navigation: LuigiAutoRoutingService,
    context: LuigiContextService
  ) {}
}
