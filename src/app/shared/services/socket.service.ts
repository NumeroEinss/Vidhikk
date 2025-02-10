import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://api2.myvidhik.com'); // Replace with your actual backend URL
  }

  // Listen for 'receive_message' event
  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('receive-message', (message) => {
        observer.next(message);
      });

      // Cleanup when unsubscribed
      return () => this.socket.off('receive-message');
    });
  }

  // Send a message (if needed)
  sendMessage(message: any) {
    this.socket.emit('send-message', message);
  }

  createRoom(room:any) {
    this.socket.emit('create-room', room);
  }

  roomCreated(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('room-created', (room) => {
        observer.next(room);
      });

      return () => this.socket.off('room-created');
    });
  }
}
