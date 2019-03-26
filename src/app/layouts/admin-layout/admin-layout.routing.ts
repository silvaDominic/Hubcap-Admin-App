import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { PackageManagerComponent } from '../../package-manager/package-manager.component';
import { PromoManagerComponent } from '../../promo-manager/promo-manager.component';
import {StoreComponent} from '../../store/store.component';
import {UsersComponent} from '../../users/users.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'store', component: StoreComponent },
    { path: 'users', component: UsersComponent },
    { path: 'package-manager',   component: PackageManagerComponent },
    { path: 'promo-manager', component: PromoManagerComponent}
];
