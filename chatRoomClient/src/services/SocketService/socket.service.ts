import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;

  constructor() {}

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  public send(messageDetails: any): void {
    this.socket.emit('message', messageDetails);
  }

  public onMessage(): Observable<any> {
    const observable = new Observable((observer) => {
      this.socket.on('message', (data: any) => observer.next(data));
    });

    return observable;
  }
}
