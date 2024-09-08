import { AppointmetState } from './reducer/appointment.reducer';
import { AuthState } from './reducer/auth.reducer';

export interface AppState {
    appointments: AppointmetState;
    auth: AuthState;
}