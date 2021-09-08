import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  public errorMessage: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {}

  ngOnInit() {}

  login() {
    // clear previous error message, if any
    this.errorMessage = '';

    this.http
      .post('http://localhost:8080/api/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe(async (data: any) => {
        // login successful
        if (data.success) {
          // navigate to chat room
          await this.storage.set('user', data.user);
          this.router.navigateByUrl('tabs/chat');
        }

        // login failed
        else {
          // show error message
          this.errorMessage = data.error;
        }
      });
  }
}
