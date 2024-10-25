import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from '../../../../_shared/models/appointment.model';
import {AppointmentService} from '../../../../_shared/services/appointment.service';
import {PackageService} from '../../../../_shared/services/package.service';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

    @Input() thisAppointment: Appointment;
    vehiclesKeys = AppointmentService.vehiclesKeys;
    packagesKeys = PackageService.packagesKeys;

    currentDate: Date;
    appointmentDate: Date;

    constructor() {
        this.currentDate = new Date();
        this.appointmentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    ngOnInit() {
    }

    updateAppointment(appointment: Appointment) {

    }

    deleteAppointment(appointment: Appointment) {

    }

}
