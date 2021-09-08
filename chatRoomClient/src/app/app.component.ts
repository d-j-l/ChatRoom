import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';

import { SocketService } from 'src/services/SocketService/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private storage: Storage,
    private socketService: SocketService
  ) {
    this.getCurrentUser();

    this.socketService.initSocket();
  }

  async getCurrentUser() {
    await this.storage.create();

    const currentUser = await this.storage.get('user');

    // Current user has already signed in - go to chat
    if (currentUser) {
      this.router.navigateByUrl('tabs/chat');
    }

    // Go to login page
    else {
      this.router.navigateByUrl('login');
    }
  }
}
