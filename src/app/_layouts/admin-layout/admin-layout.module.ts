import {NgModule} from '@angular/core';

import {SharedModule} from '../../_shared/shared.module';
import {QrScannerManagerComponent} from '../../components/qr-scanner-manager/qr-scanner-manager.component';
import {PackageOptionsComponent} from '../../components/package-manager/components/package-options/package-options.component';
import {PromoFormComponent} from '../../components/promo-manager/components/promo-form/promo-form.component';
import {PromoHistoryComponent} from '../../components/promo-manager/components/promo-history/promo-history.component';
import {PromoComponent} from '../../components/promo-manager/components/promo/promo.component';
import {ExceptionsManagerComponent} from '../../components/store-manager/components/exceptions-manager/exceptions-manager.component';
import {ScheduleManagerComponent} from '../../components/schedule-manager/schedule-manager.component';
import {ExceptionComponent} from '../../components/store-manager/components/exceptions-manager/exception/exception.component';
import {AppointmentFormComponent} from '../../components/schedule-manager/components/appointment-form/appointment-form.component';
import {PromoOverviewComponent} from '../../components/promo-manager/components/promo-overview/promo-overview.component';
import {ProfileComponent} from '../../components/profile/profile.component';
import {StoreFormComponent} from '../../components/store-manager/components/store-form/store-form.component';
import {UserManagerComponent} from '../../components/user-manager/user-manager.component';
import {UserComponent} from '../../components/user-manager/components/user/user.component';
import {PackageManagerComponent} from '../../components/package-manager/package-manager.component';
import {UserFormComponent} from '../../components/user-manager/components/user-form/user-form.component';
import {StoreManagerComponent} from '../../components/store-manager/store-manager.component';
import {PackageComponent} from '../../components/package-manager/components/package/package.component';
import {AppointmentComponent} from '../../components/schedule-manager/components/appointment/appointment.component';
import {StoreComponent} from '../../components/store-manager/components/store/store.component';
import {PromoManagerComponent} from '../../components/promo-manager/promo-manager.component';
import {ExceptionFormComponent} from '../../components/store-manager/components/exceptions-manager/exception-form/exception-form.component';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {layoutRoutes} from './admin-layout.routing';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {CoreModule} from '../../_core/core.module';
import {CarwashResolverService} from '../../_shared/resolvers/carwash-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild(layoutRoutes),
        CommonModule,
        SharedModule,
        CoreModule
    ],
    declarations: [
        DashboardComponent,
        PackageManagerComponent,
        PackageComponent,
        PackageOptionsComponent,
        PromoManagerComponent,
        PromoFormComponent,
        PromoHistoryComponent,
        PromoComponent,
        PromoOverviewComponent,
        ProfileComponent,
        UserManagerComponent,
        UserComponent,
        UserFormComponent,
        StoreManagerComponent,
        StoreComponent,
        StoreFormComponent,
        ExceptionsManagerComponent,
        ExceptionComponent,
        ExceptionFormComponent,
        ScheduleManagerComponent,
        AppointmentFormComponent,
        AppointmentComponent,
        QrScannerManagerComponent
    ],
    exports: [
    ],
    providers: [CarwashResolverService]
})

export class AdminLayoutModule {
}
