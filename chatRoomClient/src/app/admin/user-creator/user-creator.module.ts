import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCreatorPageRoutingModule } from './user-creator-routing.module';

import { UserCreatorPage } from './user-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCreatorPageRoutingModule
  ],
  declarations: [UserCreatorPage]
})
export class UserCreatorPageModule {}
