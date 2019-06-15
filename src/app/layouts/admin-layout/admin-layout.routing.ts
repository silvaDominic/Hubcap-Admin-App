import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { PackageManagerComponent } from '../../package-manager/package-manager.component';
import { PromoManagerComponent } from '../../promo-manager/promo-manager.component';
import {StoreManagerComponent} from '../../store-manager/store-manager.component';
import {UserManagerComponent} from '../../user-manager/user-manager.component';
import {ScheduleManagerComponent} from '../../schedule-manager/schedule-manager.component';
import {QrScannerManagerComponent} from '../../qr-scanner-manager/qr-scanner-manager.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'schedule-manager', component: ScheduleManagerComponent},
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'store', component: StoreManagerComponent },
    { path: 'user-manager', component: UserManagerComponent },
    { path: 'package-manager',   component: PackageManagerComponent },
    { path: 'promotion-manager', component: PromoManagerComponent},
    { path: 'qr-scanner-manager', component: QrScannerManagerComponent }
];
