import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-channel-creator',
  templateUrl: './channel-creator.page.html',
  styleUrls: ['./channel-creator.page.scss'],
})
export class ChannelCreatorPage implements OnInit {
  public name: string;
  public groups: any[] = [];
  public selectedGroup: any;

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.http.get('http://localhost:8080/api/groups').subscribe((data: any) => {
      this.groups = data.groups;
    });
  }

  groupChanged(event: any) {
    const groupName = event.detail.value.toString().trim();
    this.selectedGroup = this.groups.find((x) => x.name === groupName);
  }

  createChannel() {
    this.modalCtrl.dismiss({
      name: this.name,
      group: this.selectedGroup,
    });
  }
}
