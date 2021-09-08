import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChannelCreatorPageRoutingModule } from './channel-creator-routing.module';

import { ChannelCreatorPage } from './channel-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChannelCreatorPageRoutingModule
  ],
  declarations: [ChannelCreatorPage]
})
export class ChannelCreatorPageModule {}
