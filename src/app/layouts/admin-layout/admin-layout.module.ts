import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule, MatCheckboxModule, MatListModule, MatNativeDateModule,
    MatSnackBarModule,
    MatRadioModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {MatTabsModule} from '@angular/material/tabs';
import {PackageManagerComponent} from '../../package-manager/package-manager.component';
import {PackageComponent} from '../../package-manager/components/package/package.component';
import {PackageOptionsComponent} from '../../package-manager/components/package-options/package-options.component';
import {PromoManagerComponent} from '../../promo-manager/promo-manager.component';
import {PromoFormComponent} from '../../promo-manager/components/promo-form/promo-form.component';
import {PromoPreviewComponent} from '../../promo-manager/components/promo-preview/promo-preview.component';
import {PromoHistoryComponent} from '../../promo-manager/components/promo-history/promo-history.component';
import {MatIconModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
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
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    MatRadioModule,
    MatSnackBarModule,
    AmazingTimePickerModule
  ],
  declarations: [
    DashboardComponent,
    PackageManagerComponent,
    PackageComponent,
    PackageOptionsComponent,
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
