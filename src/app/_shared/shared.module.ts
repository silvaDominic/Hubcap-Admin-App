import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {DialogBoxComponent} from './components/dialog-box/dialog-box.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DisableControlDirective} from './directives/disable-control.directive';


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
        MatDatepickerModule,
        MatDialogModule,
    ],
    declarations: [
        DialogBoxComponent,
        DisableControlDirective
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
        MatDatepickerModule,
        DialogBoxComponent,
        DisableControlDirective
    ]
})

export class SharedModule {
}
