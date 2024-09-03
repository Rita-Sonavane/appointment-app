import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { loginSuccess, logout, setCurrentUser } from '../action/auth.actions';
import { tap, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginSuccess),
            tap(({ token }) => this.authService.saveToken(token)),
            map(({ user, token }) => setCurrentUser({ user, token })),
            tap(() => this.router.navigate(['/list']))
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            tap(() => this.authService.logout())
        ),
        { dispatch: false }
    );
}
