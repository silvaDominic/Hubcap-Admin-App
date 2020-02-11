import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../../_shared/shared.module';
import {DashboardRoutingModule} from './dashboard.routing';

@NgModule({
    imports: [
        SharedModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent
    ]
})

export class DashboardModule {}
