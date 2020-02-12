import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatExpansionModule,
    MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatRadioModule,
    MatRippleModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatStepperModule, MatTabsModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CookieModule} from 'ngx-cookie';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatTabsModule,
        MatIconModule,
        MatStepperModule,
        MatCardModule,
        MatRadioModule,
        MatSnackBarModule,
        MatChipsModule,
        MatExpansionModule,
        MatSidenavModule,
        MatToolbarModule,
        MatProgressBarModule,
        AmazingTimePickerModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        MatDialogModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatTabsModule,
        MatIconModule,
        MatStepperModule,
        MatCardModule,
        MatRadioModule,
        MatSnackBarModule,
        MatChipsModule,
        MatExpansionModule,
        MatSidenavModule,
        MatToolbarModule,
        MatProgressBarModule,
        AmazingTimePickerModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule
    ],
    declarations: [DialogBoxComponent]
})

export class SharedModule {}
