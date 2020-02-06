import {Routes} from '@angular/router';
import {QrScannerManagerComponent} from '../../components/qr-scanner-manager/qr-scanner-manager.component';
import {ScheduleManagerComponent} from '../../components/schedule-manager/schedule-manager.component';
import {StoreManagerComponent} from '../../components/store-manager/store-manager.component';
import {ProfileComponent} from '../../components/profile/profile.component';
import {UserManagerComponent} from '../../components/user-manager/user-manager.component';
import {PackageManagerComponent} from '../../components/package-manager/package-manager.component';
import {PromoManagerComponent} from '../../components/promo-manager/promo-manager.component';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {CarwashResolverService} from '../../_shared/resolvers/carwash-resolver.service';
import {ROLE} from '../../_shared/enums/ROLE';
import {RoleGuard} from '../../_core/services/role-guard.service';

export const layoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN, ROLE.FIELD_WORKER]},
        canActivate: [RoleGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN, ROLE.FIELD_WORKER]},
        canActivate: [RoleGuard]
    },
    {
        path: 'schedule-manager',
        component: ScheduleManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canActivate: [RoleGuard]
    },
    {
        path: 'store-manager',
        component: StoreManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canActivate: [RoleGuard],
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'user-manager',
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canActivate: [RoleGuard],
        component: UserManagerComponent
    },
    {
        path: 'package-manager',
        component: PackageManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canActivate: [RoleGuard],
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'promotions-manager',
        component: PromoManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canActivate: [RoleGuard],
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'qr-scanner-manager',
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN, ROLE.FIELD_WORKER]},
        canActivate: [RoleGuard],
        component: QrScannerManagerComponent
    }
];
