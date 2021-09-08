import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupUsersPageRoutingModule } from './group-users-routing.module';

import { GroupUsersPage } from './group-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupUsersPageRoutingModule
  ],
  declarations: [GroupUsersPage]
})
export class GroupUsersPageModule {}
