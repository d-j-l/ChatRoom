import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelCreatorPage } from './channel-creator.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelCreatorPageRoutingModule {}
