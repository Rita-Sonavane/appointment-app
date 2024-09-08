import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addAppointmet } from 'src/app/action/appointment.action';
import { AppState } from 'src/app/AppState';
import { Appointmet } from 'src/app/models/appointment';
import { selectAllAppointments } from 'src/app/selectors/appointment.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-appointmant',
  templateUrl: './book-appointmant.component.html',
  styleUrls: ['./book-appointmant.component.css']
})
export class BookAppointmantComponent implements OnInit {


  bookAppointmentForm: FormGroup | any;


  constructor(private router: Router, private fb: FormBuilder, private store: Store<AppState>) {

    if ('Notification' in window) {
      Notification.requestPermission();
    }

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

  }


  onSubmit() {
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

