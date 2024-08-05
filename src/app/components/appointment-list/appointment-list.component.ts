import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  newAppontmentTitle: string = '';
  newAppontmentDate: Date = new Date();

  appointments: Appointment[] = [];

  constructor() {

  }


  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments');

    //if savedAppointments jave value then parse data beacuse it is in josn
    // or if savedAppointments null or undefide then create empty array
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
  }



  addAppointment() {

    if (this.newAppontmentTitle.trim().length && this.newAppontmentDate) {

      let newAppontment: Appointment = {
        id: Date.now(),
        title: this.newAppontmentTitle,
        date: this.newAppontmentDate
      }

      this.appointments.push(newAppontment);

      localStorage.setItem("appointments", JSON.stringify(this.appointments));

      this.newAppontmentTitle = "";
      this.newAppontmentDate = new Date();

    }

  }


  deleteAppointment(index: number) {
    this.appointments.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}
