import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PackageItem} from '../../../../_shared/models/package.item.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {ITEM_TYPE} from '../../../../_shared/enums/ITEM_TYPE.model';
import {FormGroup} from '@angular/forms';
import {VEHICLE_TYPE} from '../../../../_shared/enums/VEHICLE_TYPE.model';
import {Observable, Subscription} from 'rxjs';
import {Package} from '../../../../_shared/models/package.model';

@Component({
    selector: 'app-package-options',
    templateUrl: './package-options.component.html',
    styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit, OnDestroy {
    @Output() packageSelect = new EventEmitter<number>();

    private displayPackages: Map<PackageItem, boolean> = new Map<PackageItem, boolean>();

    public selectedPackageItems: PackageItem[] = new Array<PackageItem>();
    public isMonthly = false;
    public packageForm: FormGroup;
    public subscriptions: Subscription[] = [];

    // Enums variables
    E_ITEM_TYPE = ITEM_TYPE;
    E_VEHICLE_TYPE = VEHICLE_TYPE;

    constructor(private readonly packageService: PackageService) {
    }

    public ngOnInit() {
        console.log('package-options init');
        this.initDisplayItems();
        this.initForm();
        console.log(this.packageService.package);
    }

    public ngOnDestroy(): void {
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
            });
        // If NOT selected, select and add to selectedPackageItems array
        } else if (!item.value) {
            item.value = true;
            console.log(item.key.name + ' converted to ' + item.value);
            console.log(item);
            this.selectedPackageItems.push(item.key);
        }
    }

    public createPackage(packageForm: FormGroup) {
        this.callSetFocusPackage(this.packageService.createPackage(packageForm));
    }

    public callSetFocusPackage(index: number) {
        this.packageService.creatingNewPackage = false;
        this.packageSelect.emit(index);
    }

    private initDisplayItems() {
        const tempSub = this.packageService.getAllPackageItems().subscribe(
            packageItems => {
                for (const item of packageItems) {
                    this.displayPackages.set(item, false);
                }
                console.log('Display Packages :', this.displayPackages);
                this.refreshPackageOptions();
                this.subscriptions.push(tempSub);
            }
        );
    }

    public refreshPackageOptions() {
        console.log('REFRESHING PACKAGE OPTIONS');
        // Update local variable when packages change
        const packageSub = this.packageService.package;
            packageSub.subscribe(
            _package => {
                console.log('Current selectedItems', this.selectedPackageItems);
                console.log('Current package state on refresh', _package);
                this.selectedPackageItems = _package.packageItems;
                this.resetDisplayItems();
                this.updateDisplayItems();
            }, error => {console.log(error)}
        );
    }

    /*
        Updates display packages according to selected packages
     */
    private updateDisplayItems() {
        for (const selectedItem of this.selectedPackageItems) {
            for (const staticItem of this.displayPackages.keys()) {
                if (selectedItem.name === staticItem.name) {
                    this.displayPackages.set(staticItem, true);
                }
            }
        }
    }


    public resetDisplayItems() {
        for (const item of this.displayPackages.keys()) {
            if (this.displayPackages == null || this.displayPackages.size <= 0) {
                this.initDisplayItems();
            }
            this.displayPackages.set(item, false);
        }
    }
}
