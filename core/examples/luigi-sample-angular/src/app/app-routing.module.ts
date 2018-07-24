import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './project/users/groups/customers/customers.component';
import { UsersoverviewComponent } from './project/users/usersoverview/usersoverview.component';
import { MiscellaneousComponent } from './project/miscellaneous/miscellaneous.component';
import { DevelopersComponent } from './project/developers/developers.component';
import { ProjectComponent } from './project/project.component';
import { UsersComponent } from './project/users/users.component';
import { SettingsComponent } from './project/settings/settings.component';
import { GroupsComponent } from './project/users/groups/groups.component';
import { StakeholdersComponent } from './project/users/groups/stakeholders/stakeholders.component';
import { Miscellaneous2Component } from './project/miscellaneous2/miscellaneous2.component';

const routes: Routes = [
  { path: 'projects/:projectId', component: ProjectComponent },
  { path: 'projects/:projectId/users', component: UsersComponent },
  {
    path: 'projects/:projectId/users/usersoverview',
    component: UsersoverviewComponent
  },
  { path: 'projects/:projectId/users/groups', component: GroupsComponent },
  {
    path: 'projects/:projectId/users/groups/stakeholders',
    component: StakeholdersComponent
  },
  {
    path: 'projects/:projectId/users/groups/customers',
    component: CustomersComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
