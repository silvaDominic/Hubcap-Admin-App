import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PackageService} from '../../../../_shared/services/package.service';
import {ITEM_TYPE} from '../../../../_shared/enums/ITEM_TYPE.model';
import {FormArray, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {VEHICLE_TYPE} from '../../../../_shared/enums/VEHICLE_TYPE.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilities} from '../../../../_shared/utilities';

@Component({
    selector: 'app-package-options',
    templateUrl: './package-options.component.html',
    styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit, OnDestroy, AfterViewInit {
    @Output() packageSelect = new EventEmitter<number>();

    public isMonthly = false;
    public packageForm: FormGroup;
    @ViewChild('formRef', {static: false})
    public formRef: FormGroupDirective;

    // Enums variables
    E_ITEM_TYPE = ITEM_TYPE;
    E_VEHICLE_TYPE = VEHICLE_TYPE;

    constructor(private readonly packageService: PackageService, private readonly snackBar: MatSnackBar) {
    }

    public ngOnInit() {
        console.log('package options init');
        this.initDisplayItems();
        this.initForm();
    }

    public submitFormProgrammatically() {
        this.formRef.onSubmit(undefined);
    }

    public ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
    }

    private initForm(): void {
        this.packageForm = this.packageService.getForm();
        console.log('Package Form on Init: ', this.packageForm);
    }

    public toggleIsMonthly(event): void {
        this.isMonthly = event.checked;
    }

    public buttonToggle(event, index, item): void {
        if (item.value === false && item.key.subOptions.length != 0 || item.key.subOptions.length == null) {
            console.log('Selected a SELECT. Updating Validators.');
            const arrayControl = this.packageForm.get('packageItemsFormGroup') as FormArray;
            arrayControl.at(index).get('selectedSubOption').setValidators([Validators.required]);
            arrayControl.at(index).get('selectedSubOption').updateValueAndValidity();

        } else if (item.value === true && item.key.subOptions.length != 0 || item.key.subOptions.length == null) {
            console.log('Deselected a SELECT. Updating Validators.');
            const arrayControl = this.packageForm.get('packageItemsFormGroup') as FormArray;
            arrayControl.at(index).get('selectedSubOption').clearValidators();
            arrayControl.at(index).get('selectedSubOption').updateValueAndValidity();
        }
        this.packageService.togglePIButton(event, index, item);
    }

    public selectInputChange(event, index, item): void {
        this.packageService.selectInputChange(event, index, item);
    }

    public createPackage(packageForm: FormGroup): void {
        console.log('Submitting Package Form: ', this.packageForm);
        if (packageForm.valid) {
            this.packageService.createPackage(packageForm).then((result) => {
                if (result == true) {
                    this.callSetFocusPackage(this.packageService.getPackageArrayLength() - 1);
                    this.openSnackBar(packageForm.get('nameFormGroup.name').value + ' Promo', 'Created');
                    // Otherwise, display alert
                } else {
                    alert('Error CREATING ' + packageForm.get('nameFormGroup.name').value + '.' + ' Try again or contact your Admin.')
                }
            });
        } else if (!packageForm.valid) {
            alert(
                'Please fill out the remaining fields \n' +

                Utilities.findInvalidControls(this.packageForm).map(
                    control => {
                        return control.toString() + '\n'
                    }
                )
            );
        }
    }

    public updatePackage(packageForm: FormGroup): void {
        console.log('Submitting Package Form: ', this.packageForm);
        if (packageForm.valid) {
            this.packageService.updatePackage(packageForm).then((result) => {
                if (result == true) {
                    this.callSetFocusPackage(this.packageService.getPackageArrayLength() - 1);
                    this.openSnackBar(packageForm.get('nameFormGroup.name').value + ' Promo', 'Created');
                    // Otherwise, display alert
                } else {
                    alert('Error UPDATING ' + packageForm.get('nameFormGroup.name').value + '.' + ' Try again or contact your Admin.')
                }
            });
        } else if (!packageForm.valid) {
            alert(
                'Please fill out the remaining fields \n' +

                Utilities.findInvalidControls(this.packageForm).map(
                    control => {
                        return control.toString() + '\n'
                    }
                )
            );
        }
    }

    public callSetFocusPackage(index: number) {
        this.packageService.creatingNewPackage = false;
        this.packageSelect.emit(index);
    }

    public resetForm() {
        this.packageForm.reset();
        this.packageForm = this.packageService.getForm();
        this.packageForm.updateValueAndValidity();
    }

    private initDisplayItems() {
        console.log('PO_COMP -- Init Display Items -- ENTER');
        this.packageService.initDisplayPackageItems();
        this.packageService.refreshDisplayPackageOptions();
        console.log('PO_COMP -- Init Display Items -- EXIT');
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
