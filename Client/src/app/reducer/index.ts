
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../AppState';
import { appointmentReducer } from './appointment.reducer';
import { authReducer } from './auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
    appointments: appointmentReducer,
    auth: authReducer
};
