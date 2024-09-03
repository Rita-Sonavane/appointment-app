import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { setCurrentUser } from './action/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Appointment App';

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit() {
    const token = this.authService.getToken();
    const user = this.authService.getUser();

    if (token && user) {
      console.log("From App Component:", { token, user });
      this.store.dispatch(setCurrentUser({ user, token }));
    } else {
      console.log("No token or user found in localStorage");
    }
  }

}