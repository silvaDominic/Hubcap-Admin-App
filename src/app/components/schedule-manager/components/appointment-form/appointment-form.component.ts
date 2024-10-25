import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Appointment} from '../../../../_shared/models/appointment.model';
import {AppointmentService} from '../../../../_shared/services/appointment.service';
import {PackageService} from '../../../../_shared/services/package.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

    @Input() appointments: Appointment[];
    appointmentFormGroup: FormGroup;
    vehiclesKeys = AppointmentService.vehiclesKeys;
    packagesKeys = PackageService.packagesKeys;

    currentDate: Date;
    startDate: Date;

    private static initAppointment(): Appointment {
        return new Appointment(
            '',
            '',
            '',
            '',
            '',
            '',
            null,
            null,
            false,
            ''
        )
    }

    constructor(private appointmentService: AppointmentService) {
        this.appointmentFormGroup = appointmentService.generateAppointmentForm(AppointmentFormComponent.initAppointment());

        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    ngOnInit() {
    }

    createAppointment() {
        this.appointments.push(new Appointment(
            AppointmentService.generateId(),
            this.appointmentFormGroup.get('firstName').value,
            this.appointmentFormGroup.get('lastName').value,
            this.appointmentFormGroup.get('date').value,
            this.appointmentFormGroup.get('dropOffTime').value,
            this.appointmentFormGroup.get('pickUpTime').value,
            this.appointmentFormGroup.get('vehicleType').value,
            this.appointmentFormGroup.get('packageName').value,
            false,
            this.appointmentFormGroup.get('phoneNumber').value,
        ));
        this.appointmentFormGroup.reset();
    }

}

// TODO Implement Date selection
// TODO Auto scroll for appointment list
