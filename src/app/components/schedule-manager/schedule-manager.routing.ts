import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {ScheduleManagerComponent} from './schedule-manager.component';
import {RoleGuard} from '../../_core/services/role-guard.service';

const routes: Routes = [
    {
        path: '',
        component: ScheduleManagerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ScheduleManagerRoutingModule {}
