import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; import { Observable } from 'rxjs';
import { Appointmet } from 'src/app/models/appointment';
import { selectAllAppointments } from 'src/app/selectors/appointment.selector';
import * as AppointmentActions from 'src/app/action/appointment.action';
import { selectCurrentUser } from 'src/app/selectors/auth.selectors';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {


  appointments$: Observable<Appointmet[]> | undefined;
  // loading$: Observable<boolean> | undefined;
  appointments: Appointmet[] = [];

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.select(selectAllAppointments).subscribe(data => {
      console.log('Appointments:', data); // Debugging line
      this.appointments = data;
    });


    // Dispatch the action to load appointments
    this.store.dispatch(AppointmentActions.loadAppointments());

    this.appointments$ = this.store.select(selectAllAppointments);
    // this.loading$ = this.store.select(selectAppointmentLoading);
  }


  onEdit(appointment: Appointmet) {
    console.log("app", appointment);
    // Trigger edit action
    // this.store.dispatch(AppointmentActions.editAppointment({ appointment }));
  }

  onDelete(id: string) {
    console.log("app id", id);
    // Trigger delete action
    // this.store.dispatch(AppointmentActions.deleteAppointment({ id }));
  }



}