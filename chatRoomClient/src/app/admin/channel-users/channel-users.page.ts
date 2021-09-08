import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-users',
  templateUrl: './channel-users.page.html',
  styleUrls: ['./channel-users.page.scss'],
})
export class ChannelUsersPage implements OnInit {
  @Input() channel: any;

  public availableUsers: any[] = [];
  public channelUsers: any[] = [];

  private selectedUser: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getChannelUsers();
  }

  getChannelUsers() {
    // Get list of users that belong to channel
    this.http
      .post('http://localhost:8080/api/channelUsers', this.channel)
      .subscribe((data: any) => {
        this.channelUsers = data.channelUsers;
        console.log('channel users:', this.channelUsers);

        this.getGroupUsers();
      });
  }

  getGroupUsers() {
    // Get list of users that belong to parent group
    this.http
      .post('http://localhost:8080/api/groupUsers', this.channel.parentGroup)
      .subscribe((data: any) => {
        const groupUsers = data.groupUsers;

        // If any users already belong to channel, remove them from list of available users
        groupUsers.forEach((user: any) => {
          const index = this.channelUsers.findIndex((x) => x.id === user.id);

          if (index === -1) {
            this.availableUsers.push(user);
          }
        });

        console.log('available users:', this.availableUsers);
      });
  }

  userChanged(event: any) {
    const userName = event.detail.value.toString().trim();
    this.selectedUser = this.availableUsers.find((x) => x.name === userName);
  }

  addChannelUser() {
    this.http
      .post('http://localhost:8080/api/addChannelUser', {
        channel: this.channel,
        user: this.selectedUser,
      })
      .subscribe((data: any) => {
        if (data.success) {
          // Remove selected user from list of available users and add to list of channel users
          const deleteIndex = this.availableUsers.findIndex(
            (user) => user.id === this.selectedUser.id
          );

          if (deleteIndex > -1) {
            this.availableUsers.splice(deleteIndex, 1);
          }

          this.channelUsers.push(this.selectedUser);

          this.selectedUser = undefined;
        }
      });
  }

  removeChannelUser(user: any) {
    this.http
      .post('http://localhost:8080/api/removeChannelUser', {
        channel: this.channel,
        user,
      })
      .subscribe((data: any) => {
        if (data.success) {
          // Remove selected user from list of channel users and add to list of available users
          const deleteIndex = this.channelUsers.findIndex(
            (x) => x.id === user.id
          );

          if (deleteIndex > -1) {
            this.channelUsers.splice(deleteIndex, 1);
          }

          this.availableUsers.push(user);
        }
      });
  }
}
