import {Routes} from '@angular/router';
import {QrScannerManagerComponent} from '../../components/qr-scanner-manager/qr-scanner-manager.component';
import {ScheduleManagerComponent} from '../../components/schedule-manager/schedule-manager.component';
import {StoreManagerComponent} from '../../components/store-manager/store-manager.component';
import {ProfileComponent} from '../../components/profile/profile.component';
import {UserManagerComponent} from '../../components/user-manager/user-manager.component';
import {PackageManagerComponent} from '../../components/package-manager/package-manager.component';
import {PromoManagerComponent} from '../../components/promo-manager/promo-manager.component';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';

export const layoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'schedule-manager',
        component: ScheduleManagerComponent
    },
    {
        path: 'store',
        component: StoreManagerComponent
    },
    {
        path: 'user-manager',
        component: UserManagerComponent
    },
    {
        path: 'package-manager',
        component: PackageManagerComponent
    },
    {
        path: 'promotions-manager',
        component: PromoManagerComponent
    },
    {
        path: 'qr-scanner-manager',
        component: QrScannerManagerComponent
    }
];
