import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  connection!: HubConnection

  constructor() { 
    this.connection = new HubConnectionBuilder()
      .withUrl('https://puissance4.azurewebsites.net/ws/game')
      .withAutomaticReconnect()
      .build();
    this.connection.start();

    this.connection.on('OnMessage', console.log);
  }

  send(message: string) {
    this.connection.send('SayHello', message);
  }
}
