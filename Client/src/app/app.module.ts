import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './reducer/auth.reducer';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { BookAppointmantComponent } from './components/book-appointmant/book-appointmant.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppontmentEffects } from './effects/appointment.effects';
import { appointmentReducer } from './reducer/appointment.reducer';
import { reducers } from './reducer';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent,
    AuthComponent,
    BookAppointmantComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AppontmentEffects, AuthEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
