import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('messages') public messagesComponent: MessagesComponent;

  public groups: any[] = [];
  public selectedGroup: any;

  public channels: any[] = [];
  public selectedChannel: any;

  public currentUser: any;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentUser = await this.storage.get('user');
    this.groupsForUser();
  }

  groupsForUser() {
    this.http
      .post('http://localhost:8080/api/groupsForUser', this.currentUser)
      .subscribe((data: any) => {
        this.groups = data.groupsForUser;
      });
  }

  selectGroup(group: any) {
    this.selectedGroup = group;
    this.getChannelsForGroupAndUser();
  }

  getChannelsForGroupAndUser() {
    this.http
      .post('http://localhost:8080/api/channelsForUser', {
        user: this.currentUser,
        group: this.selectedGroup,
      })
      .subscribe((data: any) => {
        this.channels = data.channelsForUser;
        console.log(this.channels);
      });
  }

  selectChannel(channel: any) {
    this.selectedChannel = channel;
    this.getMessages();
  }

  getMessages() {
    setTimeout(() => {
      this.messagesComponent.getMessages(this.selectedChannel);
    }, 200);
  }

  async logOut() {
    await this.storage.set('user', null);
    this.router.navigateByUrl('login');
  }
}
