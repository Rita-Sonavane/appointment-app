import { createReducer, on } from '@ngrx/store';
import { Appointmet } from '../models/appointment';
import * as AppointmentActions from '../action/appointment.action';

export interface AppointmetState {
    appointments: Appointmet[];
    loading: boolean;
    error: string | null;
}

export const initialState: AppointmetState = {
    appointments: [],
    loading: false,
    error: null
};

export const appointmentReducer = createReducer(
    initialState,
    on(AppointmentActions.loadAppointmentsSuccess, (state, { appointments }) => ({
        ...state,
        appointments
    })),
    on(AppointmentActions.addAppointmetSuccess, (state, { appointmet }) => ({
        ...state,
        appointments: [...state.appointments, appointmet]
    })),
    // Edit appointment success
    on(AppointmentActions.editAppointmentSuccess, (state, { appointment }) => ({
        ...state,
        appointments: state.appointments.map(a =>
            a._id === appointment._id ? appointment : a
        ),
        error: null
    })),
    // Delete appointment success
    on(AppointmentActions.deleteAppointmentSuccess, (state, { id }) => ({
        ...state,
        appointments: state.appointments.filter(a => a._id !== id),
        error: null
    })),
    // Error handling
    on(AppointmentActions.editAppointmentFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(AppointmentActions.deleteAppointmentFailure, (state, { error }) => ({
        ...state,
        error
    }))
);