import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { GroupCreatorPage } from './group-creator/group-creator.page';
import { GroupUsersPage } from './group-users/group-users.page';
import { UserCreatorPage } from './user-creator/user-creator.page';
import { RoleEditorPage } from './role-editor/role-editor.page';
import { ChannelCreatorPage } from './channel-creator/channel-creator.page';
import { ChannelUsersPage } from './channel-users/channel-users.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public currentUser: any;
  public segmentType = '';

  public users: any[] = [];
  public groups: any[] = [];
  public channels: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private storage: Storage
  ) {}

  async ionViewDidEnter() {
    this.currentUser = await this.storage.get('user');
    this.setPermissions();
  }

  ngOnInit() {
    this.getUsers();
    this.getGroups();
  }

  setPermissions() {
    // If no permissions, go back to previous page
    if (this.currentUser.role === 'User') {
      this.router.navigateByUrl('tabs/chat');
      return;
    }

    // User is a group assis - can only access channels
    if (this.currentUser.role === 'Group Assis') {
      this.segmentType = 'channels';
    }

    // User is a group admin - can only access groups and channels
    else if (this.currentUser.role === 'Group Admin') {
      this.segmentType = 'groups';
    }

    // User is a super admin - can access everything
    else {
      this.segmentType = 'users';
    }
  }

  getUsers() {
    this.http.get('http://localhost:8080/api/users').subscribe((data: any) => {
      this.users = data.users;
    });
  }

  getGroups() {
    this.http.get('http://localhost:8080/api/groups').subscribe((data: any) => {
      this.groups = data.groups;
      this.getChannels();
    });
  }

  getChannels() {
    this.http
      .get('http://localhost:8080/api/channels')
      .subscribe((data: any) => {
        this.channels = data.channels;

        // Assign parent group to channel
        this.channels.forEach((channel) => {
          channel.parentGroup = this.groups.find(
            (x) => x.id === channel.groupId
          );
        });
      });
  }

  async createUser() {
    const modal = await this.modalCtrl.create({
      component: UserCreatorPage,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        this.http
          .post('http://localhost:8080/api/createUser', result.data)
          .subscribe((data: any) => {
            if (data.success) {
              // add new user to list of users
              this.users.push(data.newUser);
            }
          });
      }
    });

    return await modal.present();
  }

  async createGroup() {
    const modal = await this.modalCtrl.create({
      component: GroupCreatorPage,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        this.http
          .post('http://localhost:8080/api/createGroup', result.data)
          .subscribe((data: any) => {
            if (data.success) {
              // add new group to list of groups
              this.groups.push(data.newGroup);
            }
          });
      }
    });

    return await modal.present();
  }

  async createChannel() {
    const modal = await this.modalCtrl.create({
      component: ChannelCreatorPage,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        console.log(result.data);

        this.http
          .post('http://localhost:8080/api/createChannel', {
            channelName: result.data.name,
            groupId: result.data.group.id,
          })
          .subscribe((data: any) => {
            if (data.success) {
              // add new channel to list of channels
              const newChannel = data.newChannel;

              newChannel.parentGroup = this.groups.find(
                (x) => x.id === newChannel.groupId
              );

              this.channels.push(newChannel);
            }
          });
      }
    });

    return await modal.present();
  }

  async editRole(user: any) {
    const modal = await this.modalCtrl.create({
      component: RoleEditorPage,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data) {
        const role = result.data.role;

        this.http
          .post('http://localhost:8080/api/changeRole', {
            id: user.id,
            role,
          })
          .subscribe((data: any) => {
            if (data.success) {
              user.role = role;
            }
          });
      }
    });

    return await modal.present();
  }

  async showGroupUsers(group: any) {
    const modal = await this.modalCtrl.create({
      component: GroupUsersPage,
      componentProps: {
        group,
      },
    });

    modal.onDidDismiss().then((result: any) => {
      // Retrieve fresh list of groups
      this.groups = [];
      this.getGroups();
    });

    return await modal.present();
  }

  async showChannelUsers(channel: any) {
    const modal = await this.modalCtrl.create({
      component: ChannelUsersPage,
      componentProps: {
        channel,
      },
    });

    modal.onDidDismiss().then((result: any) => {
      // Retrieve fresh list of channels
      this.channels = [];
      this.getChannels();
    });

    return await modal.present();
  }

  deleteUser(user: any) {
    this.presentYesNoAlert(
      'Delete user?',
      'Are you sure you want to delete user?',
      () => {
        this.http
          .post('http://localhost:8080/api/deleteUser', user)
          .subscribe((data: any) => {
            if (data.success) {
              // remove user from list of users
              const index = this.users.indexOf(user);
              if (index > -1) {
                this.users.splice(index, 1);
              }
            }
          });
      }
    );
  }

  deleteGroup(group: any) {
    this.presentYesNoAlert(
      'Delete group?',
      'Are you sure you want to delete group?',
      () => {
        this.http
          .post('http://localhost:8080/api/deleteGroup', group)
          .subscribe((data: any) => {
            if (data.success) {
              // remove group from list of groups
              const index = this.groups.indexOf(group);
              if (index > -1) {
                this.groups.splice(index, 1);
              }
            }
          });
      }
    );
  }

  deleteChannel(channel: any) {
    this.presentYesNoAlert(
      'Delete channel?',
      'Are you sure you want to delete channel?',
      () => {
        this.http
          .post('http://localhost:8080/api/deleteChannel', channel)
          .subscribe((data: any) => {
            if (data.success) {
              // remove channel from list of channels
              const index = this.channels.indexOf(channel);
              if (index > -1) {
                this.channels.splice(index, 1);
              }
            }
          });
      }
    );
  }

  async presentYesNoAlert(header: string, message: string, callback?: any) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            if (callback) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async logOut() {
    await this.storage.set('user', null);
    this.router.navigateByUrl('login');
  }
}
