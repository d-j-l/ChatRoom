import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleEditorPageRoutingModule } from './role-editor-routing.module';

import { RoleEditorPage } from './role-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleEditorPageRoutingModule
  ],
  declarations: [RoleEditorPage]
})
export class RoleEditorPageModule {}
