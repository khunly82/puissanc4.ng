import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { leaveGame, refreshGames, selectGame } from '../store/game.state';

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
        console.log(t);
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
    this.connection.on('OnGame', game => store.dispatch(selectGame({ game })));
    this.connection.on('Leave', () => store.dispatch(leaveGame()));
  }

  send(message: string) {
    this.connection.send('SayHello', message);
  }

  createGame() {
    this.connection.send('CreateGame', { color: 0 })
  }

  join(gameId: string) {
    this.connection.send('Join', gameId);
  }

  play(obj: any) {
    this.connection.send('Play', obj);
  }
}
