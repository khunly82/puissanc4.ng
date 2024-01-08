import { createAction, createReducer, on, props } from "@ngrx/store";
// actions 
// les actions qui vont déclencher la modifications des données 
export const sessionStop = createAction('session/stop');
export const sessionStart = createAction('session/start',
    // props représente les données nécessaire éxécuter l'action
    props<{ username: string, token: string }>()
);

// reducers
// comment les actions vont modifier les données

export const sessionReducer = createReducer(
    { username: null, token: null }, // intialstate
    on(sessionStop, () => ({ username: null, token: null })),
    on(sessionStart, (state: any, payload) => ({ ...state, ...payload }))
)

