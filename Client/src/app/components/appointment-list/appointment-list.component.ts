import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'; import { Observable } from 'rxjs';
import { Appointmet } from 'src/app/models/appointment';
import { selectAllAppointments } from 'src/app/selectors/appointment.selector';
import * as AppointmentActions from 'src/app/action/appointment.action';
import { selectCurrentUser } from 'src/app/selectors/auth.selectors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {


  appointments$: Observable<Appointmet[]> | any;
  loading$: Observable<boolean> | undefined;
  appointments: Appointmet[] = [];
  searchTerm: string = '';
  filteredAppointments: Appointmet[] = [];

  constructor(private store: Store, private router: Router,) {

  }

  ngOnInit(): void {
    this.store.select(selectAllAppointments).subscribe(data => {
      console.log('Appointments:', data); // Debugging line
      this.appointments = data;
    });


    // Dispatch the action to load appointments
    this.store.dispatch(AppointmentActions.loadAppointments());
    this.appointments$ = this.store.select(selectAllAppointments).subscribe((appointments: Appointmet[]) => {
      this.appointments = appointments;
      this.filteredAppointments = [...appointments];

    });
    this.loading$ = this.store.select(selectAppointmentLoading);
  }


  ShowAllTask() {
    console.log("+++++++++++++++++++++", this.filteredAppointments)
    this.appointments$ = this.store.select(selectAllAppointments).subscribe((appointments: Appointmet[]) => {
      this.appointments = appointments;
      this.filteredAppointments = appointments;
    });
  }

  CompleteTask() {
    this.filteredAppointments = this.appointments.filter(appointment =>
      appointment.status.includes('complete')
    );
  }


  IncompleteTask() {
    this.filteredAppointments = this.appointments.filter(appointment =>
      appointment.status.includes('pending')
    );
  }






  onEdit(appointment: Appointmet) {
    console.log("app", appointment)
    this.router.navigate(['/home/book', appointment._id]);
  }

  onDelete(id: string) {
    console.log("app id", id);

    Swal.fire({
      title: 'Success',
      text: 'Delete Successful',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => {

      // Trigger delete action
      this.store.dispatch(AppointmentActions.deleteAppointment({ id }));

    });
  }



}

function selectAppointmentLoading(state: object): boolean {
  throw new Error('Function not implemented.');
}
