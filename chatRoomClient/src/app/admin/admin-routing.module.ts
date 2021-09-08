import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'user-creator',
    loadChildren: () => import('./user-creator/user-creator.module').then( m => m.UserCreatorPageModule)
  },
  {
    path: 'role-editor',
    loadChildren: () => import('./role-editor/role-editor.module').then( m => m.RoleEditorPageModule)
  },
  {
    path: 'group-creator',
    loadChildren: () => import('./group-creator/group-creator.module').then( m => m.GroupCreatorPageModule)
  },
  {
    path: 'group-users',
    loadChildren: () => import('./group-users/group-users.module').then( m => m.GroupUsersPageModule)
  },
  {
    path: 'channel-creator',
    loadChildren: () => import('./channel-creator/channel-creator.module').then( m => m.ChannelCreatorPageModule)
  },
  {
    path: 'channel-users',
    loadChildren: () => import('./channel-users/channel-users.module').then( m => m.ChannelUsersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
