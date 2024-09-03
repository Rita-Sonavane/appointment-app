import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, setCurrentUser } from '../action/auth.actions';

export interface AuthState {
    token: string | null;
    user: any | null;
}

export const initialState: AuthState = {
    token: null,
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token, user }) => {
        console.log("Reducer - loginSuccess:", { token, user });
        return {
            ...state,
            token,
            user,
        };
    }),
    on(logout, () => initialState),
    on(setCurrentUser, (state, { token, user }) => {
        console.log("Reducer - setCurrentUser:", { user, token });
        return {
            ...state,
            user,
            token
        };
    })
);
