
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AppointmetService } from '../services/appointmet.service';
import * as AppointmentActions from '../action/appointment.action';
import { of } from 'rxjs';

@Injectable()
export class AppontmentEffects {
    constructor(private actions$: Actions, private appointmentService: AppointmetService) { }

    loadAppointments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppointmentActions.loadAppointments),
            mergeMap(() => this.appointmentService.getAppo()
                .pipe(map(appointments => AppointmentActions.loadAppointmentsSuccess({ appointments }))))
        )
    );

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppointmentActions.addAppointmet),
            mergeMap(action => this.appointmentService.createAppo(action.appointmet)
                .pipe(map(appointmet => AppointmentActions.addAppointmetSuccess({ appointmet }))))
        )
    );



    // Effect to handle edit appointment
    editAppointment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppointmentActions.editAppointment),
            mergeMap(({ appointment }) =>
                this.appointmentService.updateTask(appointment).pipe(
                    map(updatedAppointment =>
                        AppointmentActions.editAppointmentSuccess({
                            appointment: updatedAppointment,
                        })
                    ),
                    catchError(error =>
                        of(AppointmentActions.editAppointmentFailure({ error }))
                    )
                )
            )
        )
    );

    // Effect to handle delete appointment
    deleteAppointment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppointmentActions.deleteAppointment),
            mergeMap(({ id }) =>
                this.appointmentService.deleteTask(id).pipe(
                    map(() => AppointmentActions.deleteAppointmentSuccess({ id })),
                    catchError(error =>
                        of(AppointmentActions.deleteAppointmentFailure({ error }))
                    )
                )
            )
        )
    );

}
