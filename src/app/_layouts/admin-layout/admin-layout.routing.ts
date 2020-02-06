import {Routes} from '@angular/router';
import {QrScannerManagerComponent} from '../../components/qr-scanner-manager/qr-scanner-manager.component';
import {ScheduleManagerComponent} from '../../components/schedule-manager/schedule-manager.component';
import {StoreManagerComponent} from '../../components/store-manager/store-manager.component';
import {ProfileComponent} from '../../components/profile/profile.component';
import {UserManagerComponent} from '../../components/user-manager/user-manager.component';
import {PackageManagerComponent} from '../../components/package-manager/package-manager.component';
import {PromoManagerComponent} from '../../components/promo-manager/promo-manager.component';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {CarwashResolverService} from '../../_shared/resolvers/carwash-resolver.service';

export const layoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
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
        path: 'store-manager',
        component: StoreManagerComponent,
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'user-manager',
        component: UserManagerComponent
    },
    {
        path: 'package-manager',
        component: PackageManagerComponent,
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'promotions-manager',
        component: PromoManagerComponent,
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'qr-scanner-manager',
        component: QrScannerManagerComponent
    }
];
