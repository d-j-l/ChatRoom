import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupCreatorPageRoutingModule } from './group-creator-routing.module';

import { GroupCreatorPage } from './group-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupCreatorPageRoutingModule
  ],
  declarations: [GroupCreatorPage]
})
export class GroupCreatorPageModule {}
