import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupCreatorPage } from './group-creator.page';

const routes: Routes = [
  {
    path: '',
    component: GroupCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupCreatorPageRoutingModule {}
