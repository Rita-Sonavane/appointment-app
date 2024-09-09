import { createReducer, on } from '@ngrx/store';
import { Appointmet } from '../models/appointment';
import * as AppointmentActions from '../action/appointment.action';

export interface AppointmetState {
    appointments: Appointmet[];
    selectedAppointment: Appointmet | null;
    loading: boolean;
    error: string | null;
}

export const initialState: AppointmetState = {
    appointments: [],
    selectedAppointment: null,
    loading: false,
    error: null
};

export const appointmentReducer = createReducer(
    initialState,
    on(AppointmentActions.loadAppointmentsSuccess, (state, { appointments }) => ({
        ...state,
        appointments,
        loading: false,
        error: null
    })),
    on(AppointmentActions.addAppointmetSuccess, (state, { appointmet }) => ({
        ...state,
        appointments: [...state.appointments, appointmet],
        loading: false,
        error: null
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
    // Handle success of fetching appointment by ID
    on(AppointmentActions.getAppointmentByIdSuccess, (state, { appointment }) => ({
        ...state,
        selectedAppointment: appointment,  // Set the selected appointment
        error: null,
    })),
    // Handle failure for fetching appointment by ID
    on(AppointmentActions.getAppointmentByIdFailure, (state, { error }) => ({
        ...state,
        selectedAppointment: null,
        error,
    })),
    // Error handling for editing appointment
    on(AppointmentActions.editAppointmentFailure, (state, { error }) => ({
        ...state,
        error
    })),
    // Error handling for deleting appointment
    on(AppointmentActions.deleteAppointmentFailure, (state, { error }) => ({
        ...state,
        error
    }))
);
