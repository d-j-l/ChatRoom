import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-role-editor',
  templateUrl: './role-editor.page.html',
  styleUrls: ['./role-editor.page.scss'],
})
export class RoleEditorPage implements OnInit {
  public role: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  roleChanged(event: any) {
    const value = event.detail.value;

    if (value === 'user') {
      this.role = 'User';
    } else if (value === 'groupAssis') {
      this.role = 'Group Assis';
    } else if (value === 'groupAdmin') {
      this.role = 'Group Admin';
    } else if (value === 'superAdmin') {
      this.role = 'Super Admin';
    }
  }

  changeRole() {
    this.modalCtrl.dismiss({
      role: this.role,
    });
  }

}
