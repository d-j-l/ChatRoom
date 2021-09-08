import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.page.html',
  styleUrls: ['./group-users.page.scss'],
})
export class GroupUsersPage implements OnInit {
  @Input() group: any;

  public availableUsers: any[] = [];
  public groupUsers: any[] = [];

  private selectedUser: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getGroupUsers();
  }

  getGroupUsers() {
    // Get list of users that belong to group
    this.http
      .post('http://localhost:8080/api/groupUsers', this.group)
      .subscribe((data: any) => {
        this.groupUsers = data.groupUsers;
        this.getAllUsers();
      });
  }

  getAllUsers() {
    // Get list of all users
    this.http.get('http://localhost:8080/api/users').subscribe((data: any) => {
      const allUsers = data.users;

      // If any users already belong to group, remove them from list of available users
      allUsers.forEach((user: any) => {
        const index = this.groupUsers.findIndex((x) => x.id === user.id);

        if (index === -1) {
          this.availableUsers.push(user);
        }
      });
    });
  }

  userChanged(event: any) {
    const userName = event.detail.value.toString().trim();
    this.selectedUser = this.availableUsers.find((x) => x.name === userName);
  }

  addGroupUser() {
    this.http
      .post('http://localhost:8080/api/addGroupUser', {
        group: this.group,
        user: this.selectedUser,
      })
      .subscribe((data: any) => {
        if (data.success) {
          // Remove selected user from list of available users and add to list of group users
          const deleteIndex = this.availableUsers.findIndex(
            (user) => user.id === this.selectedUser.id
          );

          if (deleteIndex > -1) {
            this.availableUsers.splice(deleteIndex, 1);
          }

          this.groupUsers.push(this.selectedUser);

          this.selectedUser = undefined;
        }
      });
  }

  removeGroupUser(user: any) {
    this.http
      .post('http://localhost:8080/api/removeGroupUser', {
        group: this.group,
        user,
      })
      .subscribe((data: any) => {
        if (data.success) {
          // Remove selected user from list of group users and add to list of available users
          const deleteIndex = this.groupUsers.findIndex(
            (x) => x.id === user.id
          );

          if (deleteIndex > -1) {
            this.groupUsers.splice(deleteIndex, 1);
          }

          this.availableUsers.push(user);
        }
      });
  }
}
