import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../selectors/auth.selectors';
import { map, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      map(isAuthenticated => {
        console.log("Authenticated State:", isAuthenticated);

        if (!isAuthenticated) {
          console.log("Not authenticated, navigating to auth.");
          this.router.navigate(['/auth']);
          return false;
        }

        console.log("Authenticated, allowing access.");
        return true;
      })
    );
  }




}
