import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { LuigiPreloadComponent } from './component/luigi.preload.component';
import { LuigiRouteStrategy } from './route/luigi-route-strategy';
import { LuigiContextService } from './service/luigi-context.service';
import { LuigiContextServiceImpl } from './service/luigi-context.service.impl';

export const staticRoutes: Routes = [
  // here an example if you want to specify that this component is a virtualTree element in Luigi Core navigation
  {
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { fromVirtualTreeRoot: true }
  },
  // here an example if you want to specify that this component is a Luigi component and you want to change the navigation in Luigi core
  {
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { luigiRoute: '/home/reload' }
  },
  /**
   * here an example if you want to reuse the component and not recreating every time you navigate to it (a singleton Component)
   * it requires in your module to redefine
   */
  {
    path: 'luigi-client-support-preload=component',
    component: LuigiPreloadComponent,
    data: { reuse: true }
  },
  // here an example if you want to update modalPathParam on internal navigation
  {
    path: 'luigi-client-support-preload',
    component: LuigiPreloadComponent,
    data: { updateModalPathParam: true }
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
      useClass: LuigiRouteStrategy
    }
  ],
  exports: [LuigiPreloadComponent]
})
export class LuigiAngularSupportModule {}
