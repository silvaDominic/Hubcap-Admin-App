import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../shared/appointment.model';
import {AppointmentService} from '../../../shared/services/appointment.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

    @Input() thisAppointment: Appointment;
    vehiclesKeys = AppointmentService.vehiclesKeys;
    packagesKeys = AppointmentService.packageKeys;

    currentDate: Date;
    appointmentDate: Date;

    constructor() {
        this.currentDate = new Date();
        this.appointmentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    ngOnInit() {
    }

    updateAppointment() {

    }

    deleteAppointment() {

    }

}
