import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleEditorPage } from './role-editor.page';

const routes: Routes = [
  {
    path: '',
    component: RoleEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleEditorPageRoutingModule {}
