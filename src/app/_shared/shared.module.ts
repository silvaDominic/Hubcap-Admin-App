import {NgModule} from '@angular/core';

import {AppComponent} from '../app.component';
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


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
        MatSidenavModule,
        MatToolbarModule,
        AmazingTimePickerModule
    ],
    exports: [
        CommonModule,
        FormsModule,
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
        MatSidenavModule,
        MatToolbarModule,
        AmazingTimePickerModule
    ]
})

export class SharedModule {}
