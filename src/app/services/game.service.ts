import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { refreshGames } from '../store/game.state';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  connection!: HubConnection

  constructor(private readonly store: Store<{session: any}>) {
    store.select(state => state.session.token).subscribe(t => {
      if(!t) {
        this.connection?.stop();
      } else {
        this.connection = new HubConnectionBuilder()
          .withUrl('https://puissance4.azurewebsites.net/ws/game', { 
            accessTokenFactory: () => t
          })
          // .withUrl('http://localhost:5141/ws/game', { 
          //   accessTokenFactory: () => t
          // })
          .withAutomaticReconnect()
          .build();
        this.connection.start();
      }
    })

    this.connection.on('OnMessage', console.log);
    this.connection.on('OnError', (error) => alert(error));
    this.connection.on('OnGames', games => store.dispatch(refreshGames({games})));
  }

  send(message: string) {
    this.connection.send('SayHello', message);
  }

  createGame() {
    this.connection.send('CreateGame', { color: 0 })
  }
}
