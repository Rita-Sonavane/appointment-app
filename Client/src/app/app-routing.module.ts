import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AuthGuard } from './guards/auth.guard';
import { BookAppointmantComponent } from './components/book-appointmant/book-appointmant.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'home', component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      { path: 'list', component: AppointmentListComponent, },
      { path: 'book', component: BookAppointmantComponent },
      { path: 'book/:id', component: BookAppointmantComponent },
    ]
  },
  { path: '**', redirectTo: 'auth' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
