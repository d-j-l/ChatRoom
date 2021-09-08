import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupUsersPage } from './group-users.page';

const routes: Routes = [
  {
    path: '',
    component: GroupUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupUsersPageRoutingModule {}
