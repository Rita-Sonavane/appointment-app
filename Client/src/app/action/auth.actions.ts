import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ token: string; user: any }>()
);

export const logout = createAction('[Auth] Logout');

export const setCurrentUser = createAction(
    '[Auth] Set Current User',
    props<{ token: string, user: any }>()
);
