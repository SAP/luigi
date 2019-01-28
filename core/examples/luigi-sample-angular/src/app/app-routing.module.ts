import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersoverviewComponent } from './project/users/usersoverview/usersoverview.component';
import { MiscellaneousComponent } from './project/miscellaneous/miscellaneous.component';
import { DevelopersComponent } from './project/developers/developers.component';
import { ProjectComponent } from './project/project.component';
import { UsersComponent } from './project/users/users.component';
import { SettingsComponent } from './project/settings/settings.component';
import { GroupsComponent } from './project/users/groups/groups.component';
import { GroupDetailsComponent } from './project/users/groups/group-details/group-details.component';
import { GroupSettingsComponent } from './project/users/groups/group-details/group-settings/group-settings.component';
import { Miscellaneous2Component } from './project/miscellaneous2/miscellaneous2.component';
import { ChildNode2Component } from './project/default-child/dps2/child-node-2.component';
import { ChildNode1Component } from './project/default-child/dps1/child-node-1.component';
import { OverviewComponent } from './overview/overview.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { DynamicComponent } from './project/dynamic/dynamic.component';
import { HideSideNavComponent } from './project/hideSideNav/hideSideNav.component';
import { AnonymousComponent } from './anonymous/anonymous.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'restricted', component: RestrictedComponent },
  { path: 'anonymous', component: AnonymousComponent },
  { path: 'projects/:projectId', component: ProjectComponent },
  { path: 'projects/:projectId/users', component: UsersComponent },
  {
    path: 'projects/:projectId/users/usersoverview',
    component: UsersoverviewComponent
  },
  { path: 'projects/:projectId/users/groups', component: GroupsComponent },
  {
    path: 'projects/:projectId/users/groups/:groupId',
    component: GroupDetailsComponent
  },
  {
    path: 'projects/:projectId/users/groups/:groupId/settings',
    component: GroupSettingsComponent
  },
  {
    path: 'projects/:projectId/users/groups/:groupId/settings/:dynamicValue',
    component: DynamicComponent
  },
  { path: 'projects/:projectId/developers', component: DevelopersComponent },
  { path: 'projects/:projectId/settings', component: SettingsComponent },
  {
    path: 'projects/:projectId/miscellaneous',
    component: MiscellaneousComponent
  },
  {
    path: 'projects/:projectId/miscellaneous2',
    component: Miscellaneous2Component
  },
  {
    path: 'projects/:projectId/hideSideNav',
    component: HideSideNavComponent
  },
  {
    path: 'projects/:projectId/dps/dps1',
    component: ChildNode1Component
  },
  {
    path: 'projects/:projectId/dps/dps2',
    component: ChildNode2Component
  },
  {
    path: 'projects/:projectId/dynamic/:dynamicValue',
    component: DynamicComponent
  },
  {
    path: 'create/:dynamicValue',
    component: DynamicComponent
  },
  {
    path: 'environments',
    component: DynamicComponent
  },
  {
    path: 'environments/:dynamicValue',
    component: DynamicComponent
  },
  {
    path: 'environments/:ignoredDynamicValue/:dynamicValue',
    component: DynamicComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
