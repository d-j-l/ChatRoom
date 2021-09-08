import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelUsersPage } from './channel-users.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelUsersPageRoutingModule {}
