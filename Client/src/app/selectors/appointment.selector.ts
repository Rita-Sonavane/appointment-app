import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmetState } from '../reducer/appointment.reducer';


// Feature Selector
export const selectTaskState = createFeatureSelector<AppointmetState>('appointments');

export const selectAllAppointments = createSelector(
    selectTaskState,
    (state: AppointmetState) => state.appointments // Ensure this property exists in the state
);


// export const selectAppointmentLoading = createSelector(
//     selectTaskState,
//     (state: AppointmetState) => state.loading // assuming you have a loading state
// );

// Selector to get a specific task by ID
export const selectAppointmentById = (appointmetId: string) => createSelector(
    selectAllAppointments,
    (appointmets) => appointmets.find(appointmet => appointmet._id === appointmetId)
);
