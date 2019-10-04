import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PackageItem} from '../../../../_shared/models/package.item.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {ITEM_TYPE} from '../../../../_shared/enums/ITEM_TYPE.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VEHICLE_TYPE} from '../../../../_shared/enums/VEHICLE_TYPE.model';

@Component({
    selector: 'app-package-options',
    templateUrl: './package-options.component.html',
    styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit, AfterViewInit {
    private displayPackages: Map<PackageItem, boolean> = new Map<PackageItem, boolean>();

    public selectedPackageItems: PackageItem[] = Array<PackageItem>();
    public isMonthly = false;
    public packageForm: FormGroup;

    // Enums variables
    E_ITEM_TYPE = ITEM_TYPE;
    E_VEHICLE_TYPE = VEHICLE_TYPE;

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
        console.log('package-options init');
        this.initDisplayItems();
        this.initForm();
    }

    ngAfterViewInit() {
        this.refreshPackageOptions();
    }

    private initForm (): void {
        this.packageForm = this.packageService.getForm();
    }

    public toggleIsMonthly(event): void {
        this.isMonthly = event.checked;
    }

    public buttonToggle(event, index, item): void {
        console.log('Clicked: ', item.key.name, item.value);

        event.target.classList.toggle('selected');
        // If selected, deselect and remove from selectedPackageItems array
        if (item.value === true) {
            item.value = false;
            this.selectedPackageItems.filter((packageItem, i) => {
                if (item.key.name === packageItem.name) {
                    console.log(item.key.name + ' converted to false ' + packageItem.name);
                    this.selectedPackageItems.splice(i, 1);
                }
            })
        // If NOT selected, select and add to selectedPackageItems array
        } else if (!item.value) {
            item.value = true;
            console.log(item.key.name + ' converted to ' + item.value);
            this.selectedPackageItems.push(item.key);
        }
    }

    public refreshPackageOptions() {
        console.log('REFRESHING PACKAGE OPTIONS');
        // Update local variable when packages change
        this.packageService.package.subscribe(
            _package => {
                this.selectedPackageItems = _package.packageItems;
                this.resetDisplayItems();
                this.updateDisplayItems();
            }
        );
    }

    /*
        Updates display packages according to selected packages
     */
    private updateDisplayItems() {
        console.log('updating', this.selectedPackageItems);

        for (const selectedItem of this.selectedPackageItems) {
            for (const staticItem of this.displayPackages.keys()) {
                if (selectedItem.name === staticItem.name) {
                    this.displayPackages.set(staticItem, true);
                }
            }
        }
    }

    initDisplayItems() {
        for (const item of this.packageService.getAllPackageItems()) {
            this.displayPackages.set(item, false);
        }
    }

    private resetDisplayItems() {
        for (const item of this.displayPackages.keys()) {
            if (!this.displayPackages) {
                this.initDisplayItems();
            }
            this.displayPackages.set(item, false);
        }
    }
}
