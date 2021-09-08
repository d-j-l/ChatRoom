import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelUsersPageRoutingModule } from './channel-users-routing.module';

import { ChannelUsersPage } from './channel-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelUsersPageRoutingModule
  ],
  declarations: [ChannelUsersPage]
})
export class ChannelUsersPageModule {}
