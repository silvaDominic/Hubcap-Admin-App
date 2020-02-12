import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoleGuard} from '../../_core/services/role-guard.service';
import {ROLE} from '../../_shared/enums/ROLE';
import {PackageManagerComponent} from './package-manager.component';

const routes: Routes = [
    {
        path: '',
        component: PackageManagerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PackageManagerRoutingModule {
}
