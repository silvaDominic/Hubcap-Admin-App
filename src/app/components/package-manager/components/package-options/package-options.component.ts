import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {PackageItem} from '../../../../_shared/models/package.item.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {SERVICE_TYPE} from '../../../../_shared/enums/PACKAGE_TYPE.model';
import {ITEM_TYPE} from '../../../../_shared/enums/ITEM_TYPE.model';

@Component({
    selector: 'app-package-options',
    templateUrl: './package-options.component.html',
    styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit, AfterViewInit, OnChanges {
    allPackageItems: PackageItem[];
    selectedPackageItems: PackageItem[];
    packageType: SERVICE_TYPE;
    selectedOption: string;
    exteriorPackageItems: PackageItem[];
    interiorPackageItems: PackageItem[];

    // Enums variables
    E_PACKAGE_TYPE = SERVICE_TYPE;
    E_ITEM_TYPE = ITEM_TYPE;

    constructor(private packageService: PackageService) {
        this.exteriorPackageItems = [];
        this.interiorPackageItems = [];
        this.allPackageItems = [];
        this.selectedPackageItems = [];
        this.selectedOption = '';
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

    }

    ngOnChanges() {
        console.log('Changed');
        // this.updatePackageItemLists();
    }

    buttonToggle(event, index, focusArray) {
        event.target.classList.toggle('selected');
        // If selected, deselect and remove from selectedPackageItems array
        if (focusArray[index].isSelected) {
            focusArray[index].isSelected = false;
            this.selectedPackageItems.filter((packageItem, i) => {
                if (focusArray[index].name === packageItem.name) {
                    this.selectedPackageItems.splice(i, 1);
                }
            })
        // If NOT selected, select and add to selectedPackageItems array
        } else if (!focusArray[index].isSelected) {
            focusArray[index].isSelected = true;
            this.selectedPackageItems.push(this.allPackageItems[index]);
        }
    }

    public refreshPackageOptions() {
        // Initialize total list of package items
        this.allPackageItems = this.packageService.getAllPackageItems();
        // Retrieve and initialize selected package items associated with the staged package
        this.selectedPackageItems = this.packageService.getPackageItems();
        // Retrieve and initialize package time
        this.packageType = this.packageService.getType();
        this.updatePackageItems();
    }

    private updatePackageItems() {
        this.resetAllPackageItems(); // Is this too hacky?
        for (let i = 0; i < this.selectedPackageItems.length; i++) {
            for (let j = 0; j < this.allPackageItems.length; j++) {
                if (this.selectedPackageItems[i].name === this.allPackageItems[j].name) {
                    if (!this.allPackageItems[j].isSelected) {
                        this.allPackageItems[j].isSelected = true;
                    }
                    if (this.selectedPackageItems[i].isRequired) {
                        this.allPackageItems[j].isRequired = true;
                    }
                }
            }
        }
    }

    private resetAllPackageItems() {
        for (let i = 0; i < this.allPackageItems.length; i++) {
            this.allPackageItems[i].isRequired = false;
            this.allPackageItems[i].isSelected = false;
        }
    }
}
