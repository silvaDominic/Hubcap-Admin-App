import {Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../../_shared/models/appointment.model';
import {AppointmentService} from '../../_shared/services/appointment.service';
import {MatDatepicker} from '@angular/material/datepicker';

@Component({
  selector: 'app-scheduler',
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.scss']
})
export class ScheduleManagerComponent implements OnInit {

  appointments: Appointment[];
  error: string;

  @ViewChild('calendar', {static : true}) calendar: MatDatepicker<Date>;
  selectedDate: Date;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getAllAppointments()
        .subscribe({
          next: (appointments) => this.appointments = appointments,
          error: (error) => this.error = error
        });
  }

  getAllAppointments() {
      return this.appointmentService.fetchAllAppointments();
  }
}
