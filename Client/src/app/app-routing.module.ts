import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AuthGuard } from './guards/auth.guard';

// const routes: Routes = [
//   { path: '', redirectTo: 'auth', pathMatch: 'full' },
//   { path: 'auth', component: AuthComponent, canActivate: [LoginGuard] },
//   { path: 'list', component: AppointmentListComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: 'auth' }

// ];

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'list', component: AppointmentListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
