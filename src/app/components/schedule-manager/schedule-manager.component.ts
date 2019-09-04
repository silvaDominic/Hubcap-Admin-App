import {Component, OnInit, ViewChild} from '@angular/core';
import {Appointment} from '../../_shared/models/appointment.model';
import {MatCalendar} from '@angular/material';
import {AppointmentService} from '../../_shared/services/appointment.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.scss']
})
export class ScheduleManagerComponent implements OnInit {

  appointments: Appointment[];
  error: string;

  @ViewChild('calendar', {static : true}) calendar: MatCalendar<Date>;
  selectedDate: Date;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getAllAppointments()
        .subscribe(appointments => this.appointments = appointments,
            error => this.error = error);
  }

  getAllAppointments() {
      return this.appointmentService.fetchAllAppointments();
  }
}
