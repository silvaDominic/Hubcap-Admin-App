import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentService} from '../shared/services/appointment.service';
import {Appointment} from './shared/appointment.model';
import {MatCalendar} from '@angular/material';

@Component({
  selector: 'app-scheduler',
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.scss']
})
export class ScheduleManagerComponent implements OnInit {

  appointments: Appointment[];
  error: string;

  @ViewChild('calendar') calendar: MatCalendar<Date>;
  selectedDate: Date;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getAllAppointments()
        .subscribe(appointments => this.appointments = appointments,
            error => this.error = error);
  }

  getAllAppointments() {
      console.log('getting appointments');
      return this.appointmentService.fetchAllAppointments();
  }
}
