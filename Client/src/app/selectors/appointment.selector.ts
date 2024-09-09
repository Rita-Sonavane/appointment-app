import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmetState } from '../reducer/appointment.reducer';

// Feature Selector
export const selectTaskState = createFeatureSelector<AppointmetState>('appointments');

// Selector to get all appointments
export const selectAllAppointments = createSelector(
    selectTaskState,
    (state: AppointmetState) => state.appointments // Ensure this property exists in the state
);

// Selector to get a specific appointment by ID
export const selectAppointmentById = (appointmentId: string) => createSelector(
    selectAllAppointments,
    (appointments) => appointments.find(appointment => appointment._id === appointmentId)
);

// Selector for the currently selected appointment (from the reducer state)
export const selectSelectedAppointment = createSelector(
    selectTaskState,
    (state: AppointmetState) => state.selectedAppointment
);
