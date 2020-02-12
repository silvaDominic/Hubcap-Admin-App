import {NgModule} from '@angular/core';
import {EmployeeManagerRoutingModule} from './employee-manager.routing';
import {SharedModule} from '../../_shared/shared.module';
import {EmployeeManagerComponent} from './employee-manager.component';
import {EmployeeComponent} from './components/employee/employee.component';
import {EmployeeFormComponent} from './components/employee-form/employee-form.component';


@NgModule({
    imports: [
        SharedModule,
        EmployeeManagerRoutingModule
    ],
    declarations: [
        EmployeeManagerComponent,
        EmployeeComponent,
        EmployeeFormComponent
    ]
})
export class EmployeeManagerModule {}
