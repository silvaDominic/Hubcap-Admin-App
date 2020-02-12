import {Routes} from '@angular/router';
import {QrScannerManagerComponent} from '../../components/qr-scanner-manager/qr-scanner-manager.component';
import {ScheduleManagerComponent} from '../../components/schedule-manager/schedule-manager.component';
import {StoreManagerComponent} from '../../components/store-manager/store-manager.component';
import {ProfileComponent} from '../../components/profile/profile.component';
import {EmployeeManagerComponent} from '../../components/employee-manager/employee-manager.component';
import {PackageManagerComponent} from '../../components/package-manager/package-manager.component';
import {PromoManagerComponent} from '../../components/promo-manager/promo-manager.component';
import {DashboardComponent} from '../../components/dashboard/dashboard.component';
import {CarwashResolverService} from '../../_shared/resolvers/carwash-resolver.service';
import {ROLE} from '../../_shared/enums/ROLE';
import {RoleGuard} from '../../_core/services/role-guard.service';
import {AuthGuard} from '../../_core/services/auth-guard.service';

export const layoutRoutes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'qr-scanner-manager',
        component: QrScannerManagerComponent
    },
    {
        path: 'store-manager',
        component: StoreManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canLoad: [RoleGuard],
        loadChildren: () => import('../../components/store-manager/store-manager.module').then(mod => mod.StoreManagerModule),
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'package-manager',
        component: PackageManagerComponent,
        canLoad: [AuthGuard],
        loadChildren: () => import('../../components/package-manager/package-manager.module').then(mod => mod.PackageManagerModule),
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'promotions-manager',
        component: PromoManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canLoad: [RoleGuard],
        loadChildren: () => import('../../components/promo-manager/promo-manager.module').then(mod => mod.PromoManagerModule),
        resolve: {
            coreServiceStatus: CarwashResolverService
        }
    },
    {
        path: 'employee-manager',
        component: EmployeeManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canLoad: [RoleGuard],
        loadChildren: () => import('../../components/employee-manager/employee-manager.module').then(mod => mod.EmployeeManagerModule),
    },
    {
        path: 'schedule-manager',
        component: ScheduleManagerComponent,
        data: {allowedRoles: [ROLE.FULL_ADMIN, ROLE.LOCAL_ADMIN]},
        canLoad: [RoleGuard],
        loadChildren: () => import('../../components/schedule-manager/schedule-manager.module').then(mod => mod.ScheduleManagerModule),
    },
];
