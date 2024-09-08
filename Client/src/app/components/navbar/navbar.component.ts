import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/action/auth.actions';
import { AppState } from 'src/app/AppState';
import { Appointmet } from 'src/app/models/appointment';
import { selectCurrentUser } from 'src/app/selectors/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  newAppontmentTitle: string = '';
  newAppontmentDate: Date = new Date();

  appointments: Appointmet[] = [];
  currentUser$ = this.store.select(selectCurrentUser);
  currentUser: any;

  constructor(private store: Store<AppState>, private router: Router) { }


  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      console.log("User", user);
      const nameParts = user.name.split(' ');
      this.currentUser = nameParts[0];
    })
  }

  logout() {
    console.log("Logout Cliked");
    this.store.dispatch(logout());
  }



}
