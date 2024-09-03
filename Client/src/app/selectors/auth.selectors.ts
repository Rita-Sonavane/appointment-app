import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';



// export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthState = (state: any) => state.auth;


export const selectToken = createSelector(
    selectAuthState,
    (state: AuthState) => state?.token
);

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state: AuthState) => state?.user
);

export const selectIsAuthenticated = createSelector(
    selectToken,
    selectCurrentUser,
    (token, user) => {
        console.log("Selector - Token:", token);
        console.log("Selector - User:", user);
        const isAuthenticated = !!token && !!user;
        console.log("Selector - IsAuthenticated:", isAuthenticated);
        return isAuthenticated;
    }
);

