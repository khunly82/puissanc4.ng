import { state } from "@angular/animations";
import { createAction, createReducer, on, props } from "@ngrx/store";

export const refreshGames = createAction('games/refresh', props<{games: any}>());
export const selectGame = createAction('games/select', props<{ game: any }>());
export const leaveGame = createAction('games/leave');

export const gameReducer = createReducer(
    { games: [], selectedGame: null },
    on(refreshGames, (state, payload) => {
        return { ...state, games: payload.games };
    }),
    on(selectGame, (state, payload) => {
        return { ...state, selectedGame: payload.game };
    }),
    on(leaveGame, (state) => {
        return {...state, selectedGame: null };
    })
);