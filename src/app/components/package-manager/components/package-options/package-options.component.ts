import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PackageService} from '../../../../_shared/services/package.service';
import {ITEM_TYPE} from '../../../../_shared/enums/ITEM_TYPE.model';
import {FormGroup} from '@angular/forms';
import {VEHICLE_TYPE} from '../../../../_shared/enums/VEHICLE_TYPE.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-package-options',
    templateUrl: './package-options.component.html',
    styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit, OnDestroy, AfterViewInit {
    @Output() packageSelect = new EventEmitter<number>();

    public isMonthly = false;
    public packageForm: FormGroup;

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

    public ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
    }

    private initForm(): void {
        this.packageForm = this.packageService.getForm();
    }

    public toggleIsMonthly(event): void {
        this.isMonthly = event.checked;
    }

    public buttonToggle(event, index, item): void {
        this.packageService.togglePIButton(event, index, item);
    }

    public selectInputChange(event, index, item): void {
        this.packageService.selectInputChange(event, index, item);
    }

    public createPackage(packageForm: FormGroup): void {
        this.packageService.createPackage(packageForm).then((result) => {
            if (result == true) {
                this.callSetFocusPackage(this.packageService.getPackageArrayLength() - 1);
                this.openSnackBar(packageForm.get('nameFormGroup.name').value + ' Promo', 'Created');
                // Otherwise, display alert
            } else {
                alert('Error CREATING ' + packageForm.get('nameFormGroup.name').value + '.' + ' Try again or contact your Admin.')
            }
        });
    }

    public callSetFocusPackage(index: number) {
        this.packageService.creatingNewPackage = false;
        this.packageSelect.emit(index);
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
