import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule, MatCheckboxModule, MatListModule, MatNativeDateModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {PackageManagerComponent} from '../../package-manager/package-manager.component';
import {MenuComponent} from '../../package-manager/components/menu/menu.component';
import {MenuOptionsComponent} from '../../package-manager/components/menu-options/menu-options.component';
import {PromoManagerComponent} from '../../promo-manager/promo-manager.component';
import {PromoFormComponent} from '../../promo-manager/components/promo-form/promo-form.component';
import {PromoPreviewComponent} from '../../promo-manager/components/promo-preview/promo-preview.component';
import {PromoHistoryComponent} from '../../promo-manager/components/promo-history/promo-history.component';
import {MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    PackageManagerComponent,
    MenuComponent,
    MenuOptionsComponent,
    PromoManagerComponent,
    PromoFormComponent,
    PromoPreviewComponent,
    PromoHistoryComponent,
    UserProfileComponent,
    IconsComponent,
    NotificationsComponent
  ]
})

export class AdminLayoutModule {}
