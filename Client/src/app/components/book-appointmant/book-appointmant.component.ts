import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addAppointmet, editAppointment, getAppointmentById } from 'src/app/action/appointment.action';
import { AppState } from 'src/app/AppState';
import { Appointmet } from 'src/app/models/appointment';
import { selectSelectedAppointment } from 'src/app/selectors/appointment.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-appointmant',
  templateUrl: './book-appointmant.component.html',
  styleUrls: ['./book-appointmant.component.css']
})
export class BookAppointmantComponent implements OnInit {


  bookAppointmentForm: FormGroup | any;
  selectedAppointment$: Observable<Appointmet> | any;
  isEditMode = false;
  editappointmentId: string | any;
  showForm = false;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private store: Store<AppState>) {

    if ('Notification' in window) {
      Notification.requestPermission();
    }
    // Select the selected appointment from the store
    this.selectedAppointment$ = this.store.select(selectSelectedAppointment);
  }

  ngOnInit(): void {

    this.bookAppointmentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.email]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      reminder: ['', [Validators.required]],
    });


    // this.editappointmentId = this.route.snapshot.paramMap.get('id');
    // if (this.editappointmentId) {
    //   this.loadAppointment(this.editappointmentId);
    //   console.log("InONINIT", this.editappointmentId);
    // }



    this.editappointmentId = this.route.snapshot.paramMap.get('id');
    if (this.editappointmentId) {
      this.showForm = true;
      console.log("this.editappointmentId", this.editappointmentId);

      this.store.dispatch(getAppointmentById({ id: this.editappointmentId }));

      // Subscribe to the selectedAppointment observable and patch the form
      this.selectedAppointment$.subscribe((appointment: any) => {
        console.log("this >>>>>>>>>>>>appointment", appointment);
        if (appointment) {
          const deadline = appointment.deadline ? new Date(appointment.deadline).toISOString().split('T')[0] : '';
          const reminder = appointment.reminder ? new Date(appointment.reminder).toISOString().slice(0, 16) : '';

          this.bookAppointmentForm.patchValue({
            title: appointment.title,
            description: appointment.description,
            priority: appointment.priority,
            deadline: deadline, // Patching formatted date
            reminder: reminder, // Patching formatted datetime-local
            status: appointment.status,
          });
        }
      });
    }
  }





  onSubmit() {

    if (this.editappointmentId) {
      this.showForm = true;
      // Call the update service if editing
      const updatedAppointment = {
        ...this.bookAppointmentForm.value,
        _id: this.editappointmentId,
      };

      Swal.fire({
        title: 'Success',
        text: 'Update  Successful',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      }).then(() => {

        // Trigger the NgRx edit action here
        this.store.dispatch(editAppointment({ appointment: updatedAppointment }));

        this.router.navigate(['/home/list']);
      });

    } else {
      this.showForm = false;
      console.log("form vale", this.bookAppointmentForm.value);

      Swal.fire({
        title: 'Success',
        text: 'Appointment Save Successful',
        icon: 'success',
        timer: 1000, // Automatically close after 2 seconds
        showConfirmButton: false // Hide the confirm button
      }).then(() => {

        const appointment: Appointmet = this.bookAppointmentForm.value;
        this.store.dispatch(addAppointmet({ appointmet: appointment }));

        this.router.navigate(['/home/list']);
      });

      (error: any) => {
        console.log(error);

        let title = 'Error';
        let text = 'Something went wrong. Please try again later.';

        if (error.status === 401 && error.error.message === 'Invalid credentials') {
          text = 'Invalid email or password. Please try again.';
        } else if (error.status === 404 && error.error.message === 'User not found') {
          text = 'No account found with this email. Please check your email and try again.';
        }

        Swal.fire({
          title: title,
          text: text,
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    }

  }






  sendNotification(title: string, options?: NotificationOptions) {
    if ('Notification' in window) {
      new Notification(title, options);
    }
  }


  convertToUTC(date: string, time: string): string {
    const [hours, minutes] = time.split(':');
    const localDateTime = new Date(`${date}T${hours}:${minutes}:00`);
    return localDateTime.toISOString(); // Convert to ISO string in UTC
  }

}

