import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { AppointmetService } from './appointmet.service';
import { Appointmet } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private appointmetService: AppointmetService) {
    this.checkReminders();
  }

  checkReminders() {
    interval(60000).subscribe(() => { // Check every minute
      this.fetchReminders().subscribe(reminders => {
        reminders.forEach(reminder => {
          if (this.isReminderDue(reminder)) {
            this.sendNotification(reminder.title);
          }
        });
      });
    });
  }

  fetchReminders() {
    return this.appointmetService.fetchReminders(); // Use the service method to get reminders
  }

  isReminderDue(reminder: Appointmet) {
    // Check if the current time is close to the reminder time
    const now = new Date();
    const reminderTime = new Date(reminder.reminder);
    return now >= reminderTime && now <= new Date(reminderTime.getTime() + 5 * 60 * 1000);
  }

  sendNotification(title: string) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title);
    }
  }
}