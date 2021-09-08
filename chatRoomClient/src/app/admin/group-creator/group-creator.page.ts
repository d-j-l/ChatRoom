import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-group-creator',
  templateUrl: './group-creator.page.html',
  styleUrls: ['./group-creator.page.scss'],
})
export class GroupCreatorPage implements OnInit {
  public name: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  createGroup() {
    this.modalCtrl.dismiss({
      name: this.name,
    });
  }
}
