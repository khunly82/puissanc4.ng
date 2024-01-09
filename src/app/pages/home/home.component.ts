import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  games: any[] = [];
  constructor(
    private readonly _gameService: GameService,
    private readonly _store: Store<{session: any, game: any}>
  ){ }

  ngOnInit(): void {
    this._store.select(state => state.game.games)
      .subscribe(games => this.games = games);
  }

  createGame() {
    this._gameService.createGame();
  }
}
