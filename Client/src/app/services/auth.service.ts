import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from '../action/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/users';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) { }

  login(credentials: { email: string; password: string }): Observable<{ token: string; user: any }> {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        tap(response => {
          console.log("About to dispatch loginSuccess:", { token: response.token, user: response.user });
          this.store.dispatch(loginSuccess({ token: response.token, user: response.user }));
          this.saveToken(response.token);
          this.saveUser(response.user);
        })
      );
  }


  logout(): void {
    this.store.dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup  `, user);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    console.log("Token is not store", token);
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));

  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

}
