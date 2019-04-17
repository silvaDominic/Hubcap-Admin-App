import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatRadioModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatStepperModule,
    MatTabsModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {PackageManagerComponent} from '../../package-manager/package-manager.component';
import {PackageComponent} from '../../package-manager/components/package/package.component';
import {PackageOptionsComponent} from '../../package-manager/components/package-options/package-options.component';
import {PromoManagerComponent} from '../../promo-manager/promo-manager.component';
import {PromoFormComponent} from '../../promo-manager/components/promo-form/promo-form.component';
import {PromoPreviewComponent} from '../../promo-manager/components/promo-preview/promo-preview.component';
import {PromoHistoryComponent} from '../../promo-manager/components/promo-history/promo-history.component';
import {UserManagerComponent} from '../../user-manager/user-manager.component';
import {UserComponent} from '../../user-manager/components/user/user.component';
import {UserFormComponent} from '../../user-manager/components/user-form/user-form.component';
import {StoreManagerComponent} from '../../store-manager/store-manager.component';
import {StoreComponent} from '../../store-manager/components/store/store.component';
import {StoreFormComponent} from '../../store-manager/components/store-form/store-form.component';
import {ExceptionsManagerComponent} from '../../store-manager/components/store-form/components/exceptions-manager/exceptions-manager.component';
import { ExceptionFormComponent } from '../../store-manager/components/store-form/components/exceptions-manager/exception-form/exception-form.component';
import { ExceptionComponent } from '../../store-manager/components/store-form/components/exceptions-manager/exception/exception.component';

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
    MatChipsModule,
    MatExpansionModule,
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
    UserManagerComponent,
    UserComponent,
    UserFormComponent,
    StoreManagerComponent,
    StoreComponent,
    StoreFormComponent,
    ExceptionsManagerComponent,
    ExceptionComponent,
    ExceptionFormComponent
  ]
})

export class AdminLayoutModule {}
