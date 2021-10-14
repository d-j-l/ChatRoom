import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';

import { SocketService } from 'src/services/SocketService/socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  
  public messageContent = '';
  public messages: string[] = [];

  private ioConnection: any;
  private currentUser: any;
  private channel: any;

  private selectedFile: File;
  fd = new FormData();

  constructor(
    private socketService: SocketService,
    private storage: Storage,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.currentUser = await this.storage.get('user');

    this.initIoConnection();
  }

  initIoConnection() {
    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: any) => {
        // add new message to messages array
        this.messages.push(message);
      });
  }

  getMessages(channel: any) {
    this.messages = [];
    this.channel = channel;

    this.http
      .post('http://localhost:8080/api/messages', {
        channel,
      })
      .subscribe((data: any) => {
        this.messages = data.messages;
      });
  }

  sendMessage() {
    if (this.messageContent) {
      const message = {
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        content: this.messageContent,
      };

      this.socketService.send(message);

      this.http.post('http://localhost:8080/api/sendMessage', {
        channel: this.channel,
        message,
      });

      this.messageContent = null;
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////
  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }

  upload() {
    this.http.post('http://localhost:8080/api/upload', this.fd)
      .subscribe( result => {
        console.log(result);
      });
      
      this.selectedFile = null;
  }

  sendFile() {
    if (this.selectedFile) {
      console.log(this.selectedFile);

      const file = {
        userId: this.currentUser.id,
        userName: this.currentUser.name,
        content: this.selectedFile.name,
      };

      this.socketService.send(file);

      this.selectedFile = null;

/*       this.http.post('http://localhost:8080/api/sendFile', {
        channel: this.channel,
        file,
      }); */
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////

}
