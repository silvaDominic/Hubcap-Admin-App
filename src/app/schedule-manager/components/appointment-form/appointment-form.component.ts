import {Component, Input, OnInit} from '@angular/core';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {Appointment} from '../../shared/appointment.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

    @Input() appointments: Appointment[];
    appointmentFormGroup: FormGroup;
    vehiclesKeys = AppointmentService.vehiclesKeys;
    packagesKeys = AppointmentService.packageKeys;

    currentDate: Date;
    startDate: Date;

    private static initAppointment(): Appointment {
        return new Appointment(
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

    constructor(private appointmentService: AppointmentService, private atp: AmazingTimePickerService) {
        this.appointmentFormGroup = appointmentService.generateAppointmentForm(AppointmentFormComponent.initAppointment());

        this.currentDate = new Date();
        this.startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDay());
    }

    ngOnInit() {
    }

    createAppointment() {
        this.appointments.push(new Appointment(
            AppointmentService.generateId(),
            this.appointmentFormGroup.get('clientName').value,
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
