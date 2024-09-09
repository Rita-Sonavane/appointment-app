import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Appointmet } from '../models/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmetService {

  private apiUrl = 'http://localhost:3001/tasks';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) { }


  getAppo(): Observable<Appointmet[]> {
    return this.http.get<Appointmet[]>(`${this.apiUrl}/`);
  }


  getTaskById(id: string): Observable<Appointmet> {
    return this.http.get<Appointmet>(`${this.apiUrl}/${id}`);
  }

  createAppo(appointment: Appointmet): Observable<Appointmet> {
    console.log("from service", appointment);
    return this.http.post<Appointmet>(`${this.apiUrl}/create`, appointment)
  }

  updateTask(appointment: Appointmet): Observable<Appointmet> { return this.http.put<Appointmet>(`${this.apiUrl}/update/${appointment._id}`, appointment); }

  deleteTask(appointmentId: string): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/delete/${appointmentId}`); }

  fetchReminders(): Observable<Appointmet[]> {
    return this.http.get<Appointmet[]>(`${this.apiUrl}/`);
  }

}
