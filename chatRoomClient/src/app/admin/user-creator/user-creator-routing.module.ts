import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCreatorPage } from './user-creator.page';

const routes: Routes = [
  {
    path: '',
    component: UserCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCreatorPageRoutingModule {}
