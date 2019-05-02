import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from '../../schedule-manager/shared/appointment.model';
import {VEHICLE_TYPE} from '../models/VEHICLE_TYPE.model';
import {PACKAGE} from '../models/PACKAGE.model';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    static vehiclesKeys = Object.keys(VEHICLE_TYPE);
    static packageKeys = Object.keys(PACKAGE);

    private appointmentsUrl = 'http://localhost:4200/assets/data/appointments.json';

    constructor(private http: HttpClient) {}

    fetchAllAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.appointmentsUrl)
    }

    fetchAppointment(date: string): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(this.appointmentsUrl, )
    }

    newAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(this.appointmentsUrl, appointment);
    }
}
