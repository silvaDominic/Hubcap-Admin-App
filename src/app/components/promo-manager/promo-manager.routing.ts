import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PromoManagerComponent} from './promo-manager.component';
import {RoleGuard} from '../../_core/services/role-guard.service';

const routes: Routes = [
    {
        path: '',
        component: PromoManagerComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PromoManagerRoutingModule {}
