import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-creator',
  templateUrl: './user-creator.page.html',
  styleUrls: ['./user-creator.page.scss'],
})
export class UserCreatorPage implements OnInit {
  public name: string;
  public email: string;
  public password: string;
  public role: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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

  createUser() {
    this.modalCtrl.dismiss({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    });
  }
}
