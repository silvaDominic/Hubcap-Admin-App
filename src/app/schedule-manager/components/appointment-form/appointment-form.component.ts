import { Component, OnInit } from '@angular/core';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppointmentService} from '../../../shared/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  appointmentFormGroup: FormGroup;
  vehiclesKeys = AppointmentService.vehiclesKeys;
  packagesKeys = AppointmentService.packageKeys;

  constructor(private appointmentService: AppointmentService, private fb: FormBuilder, private atp: AmazingTimePickerService) {
    this.appointmentFormGroup = fb.group({
        nameCtrl: ['', Validators.required],
        vehicleTypeCtrl: ['', Validators.required],
        packageCtrl: ['', Validators.required],
        dropOffTime: ['', Validators.required],
        pickUpTime: ['', Validators.required],
        phoneNumberCtrl: ['']
    })
  }

  ngOnInit() {
  }

  // TODO Research mat-calendar before continuing

}
