import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DisplayPackageItem} from '../../../../_shared/models/display-package-item.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {ITEM_TYPE} from '../../../../_shared/enums/ITEM_TYPE.model';
import {FormGroup} from '@angular/forms';
import {VEHICLE_TYPE} from '../../../../_shared/enums/VEHICLE_TYPE.model';
import {Observable, Subscription} from 'rxjs';
import {Package} from '../../../../_shared/models/package.model';
import {PackageItem} from '../../../../_shared/models/package-item.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-package-options',
    templateUrl: './package-options.component.html',
    styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit, OnDestroy, AfterViewInit {
    @Output() packageSelect = new EventEmitter<number>();

    private displayPackageItems: Map<DisplayPackageItem, boolean> = new Map<DisplayPackageItem, boolean>();

    public selectedPackageItems: PackageItem[] = new Array<PackageItem>();
    public isMonthly = false;
    public packageForm: FormGroup;

    // Enums variables
    E_ITEM_TYPE = ITEM_TYPE;
    E_VEHICLE_TYPE = VEHICLE_TYPE;

    constructor(private readonly packageService: PackageService, private readonly snackBar: MatSnackBar) {
    }

    public ngOnInit() {
        console.log('package-options init');
        this.initDisplayItems();
        this.initForm();
        console.log(this.packageService.package);
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
        console.log('Clicked: ', item.key, item.value);

        event.target.classList.toggle('selected');
        // If selected, deselect and remove from selectedPackageItems array
        if (item.value == true) {
            item.value = false;
            this.selectedPackageItems.filter((packageItem, i) => {
                if (item.key.name === packageItem.name) {
                    console.log(item.key.name + ' converted to false ' + packageItem.name);
                    this.selectedPackageItems.splice(i, 1);
                }
            });
            // If NOT selected, select and add to selectedPackageItems array
        } else if (item.value == false) {
            item.value = true;
            console.log(item.key.name + ' converted to ' + item.value);
            console.log(item);
            this.selectedPackageItems.push(new PackageItem(item.key.name, item.key.selectedSubOption));
        }
    }

    public selectInputChange(event, index, item): void {
        // If selected, deselect and remove from selectedPackageItems array
        this.selectedPackageItems.filter((packageItem, i) => {
            if (item.key.name === packageItem.name) {
                this.selectedPackageItems[i].selectedSubOption = item.key.selectedSubOption
            }
        });
    }

    public createPackage(packageForm: FormGroup) {
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
        this.packageService.getDisplayPackageItems().subscribe(
            packageItems => {
                for (const item of packageItems) {
                    this.displayPackageItems.set(item, false);
                }
                console.log('Display Packages :', this.displayPackageItems);
                this.refreshPackageOptions();
            }
        );
    }

    public refreshPackageOptions() {
        console.log('REFRESHING PACKAGE OPTIONS');
        // Update local variable when packages change
        const packageSub = this.packageService.package.subscribe(
            _package => {
                console.log('Current selectedItems', this.selectedPackageItems);
                this.selectedPackageItems = _package.packageItems;
                console.log('Current package state on refresh', _package);
                this.resetDisplayItems();
                this.updateDisplayItems();
            }, error => {
                console.log(error)
            }
        );
        packageSub.unsubscribe();
    }

    /*
        Updates display packages according to selected packages
     */
    private updateDisplayItems() {
        for (const selectedItem of this.selectedPackageItems) {
            for (const staticItem of this.displayPackageItems.keys()) {
                if (selectedItem.name === staticItem.name) {
                    staticItem.selectedSubOption = selectedItem.selectedSubOption;
                    this.displayPackageItems.set(staticItem, true);
                }
            }
        }
    }

    public resetDisplayItems() {
        for (const item of this.displayPackageItems.keys()) {
            if (this.displayPackageItems == null || this.displayPackageItems.size <= 0) {
                console.log('Display packages null. Attempting to reinitialize');
                this.initDisplayItems();
            }
            this.displayPackageItems.set(item, false);
        }
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
