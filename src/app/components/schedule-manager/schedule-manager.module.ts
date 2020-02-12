import {NgModule} from '@angular/core';
import {SharedModule} from '../../_shared/shared.module';
import {ScheduleManagerComponent} from './schedule-manager.component';
import {AppointmentComponent} from './components/appointment/appointment.component';
import {AppointmentFormComponent} from './components/appointment-form/appointment-form.component';
import {ScheduleManagerRoutingModule} from './schedule-manager.routing';

@NgModule({
    imports: [
        SharedModule,
        ScheduleManagerRoutingModule
    ],
    declarations: [
        ScheduleManagerComponent,
        AppointmentComponent,
        AppointmentFormComponent
    ]
})

export class ScheduleManagerModule {}
