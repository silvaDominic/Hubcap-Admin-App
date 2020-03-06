import {NgModule} from '@angular/core';

import {SharedModule} from '../../_shared/shared.module';
import {QrScannerManagerComponent} from '../../components/qr-scanner-manager/qr-scanner-manager.component';
import {ProfileComponent} from '../../components/profile/profile.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CarwashResolverService} from '../../_shared/resolvers/carwash-resolver.service';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {layoutRoutes} from './admin-layout.routing';
import {StoreManagerModule} from '../../components/store-manager/store-manager.module';
import {PackageManagerModule} from '../../components/package-manager/package-manager.module';
import {PromoManagerModule} from '../../components/promo-manager/promo-manager.module';
import {ScheduleManagerModule} from '../../components/schedule-manager/schedule-manager.module';
import {EmployeeManagerModule} from '../../components/employee-manager/employee-manager.module';
import {EmployeeResolverService} from '../../_shared/resolvers/employee-resolver.service';


@NgModule({
    imports: [
        RouterModule.forChild(layoutRoutes),
        CommonModule,
        SharedModule,
        StoreManagerModule,
        PackageManagerModule,
        PromoManagerModule,
        ScheduleManagerModule,
        EmployeeManagerModule
    ],
    declarations: [
        ProfileComponent,
        QrScannerManagerComponent,
        DashboardComponent
    ],
    exports: [
    ],
    providers: [CarwashResolverService, EmployeeResolverService]
})

export class AdminLayoutModule {
}
