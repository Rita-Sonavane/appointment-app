import { createAction, props } from '@ngrx/store';
import { Appointmet } from '../models/appointment';


export const loadAppointments = createAction('[Appointment] Load Appointments');
export const loadAppointmentsSuccess = createAction('[Appointment] Load Appointments Success', props<{ appointments: Appointmet[] }>());
export const addAppointmet = createAction('[Appointment] Add Appointment', props<{ appointmet: Appointmet }>());
export const addAppointmetSuccess = createAction('[Appointment] Add Appointment Success', props<{ appointmet: Appointmet }>());



// Action to edit an appointment
export const editAppointment = createAction(
    '[Appointment] Edit Appointment',
    props<{ appointment: Appointmet }>()
);

// Action to delete an appointment
export const deleteAppointment = createAction(
    '[Appointment] Delete Appointment',
    props<{ id: string }>()
);

// Actions for success/failure of editing/deleting
export const editAppointmentSuccess = createAction(
    '[Appointment] Edit Appointment Success',
    props<{ appointment: Appointmet }>()
);

export const editAppointmentFailure = createAction(
    '[Appointment] Edit Appointment Failure',
    props<{ error: string }>()
);

export const deleteAppointmentSuccess = createAction(
    '[Appointment] Delete Appointment Success',
    props<{ id: string }>()
);

export const deleteAppointmentFailure = createAction(
    '[Appointment] Delete Appointment Failure',
    props<{ error: string }>()
);