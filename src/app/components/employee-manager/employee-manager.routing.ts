import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeManagerComponent} from './employee-manager.component';

const routes: Routes = [
    {
        path: '',
        component: EmployeeManagerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeManagerRoutingModule {}
