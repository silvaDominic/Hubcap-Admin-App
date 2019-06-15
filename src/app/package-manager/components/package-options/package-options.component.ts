import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Package} from '../../shared/package.model';
import {ITEM_TYPE} from '../../../shared/models/ITEM_TYPE.model';
import {PACKAGE_TYPE} from '../../../shared/models/PACKAGE_TYPE.model';
import {PackageItem} from '../../shared/package.item.model';

@Component({
    selector: 'app-package-options',
    templateUrl: './package-options.component.html',
    styleUrls: ['./package-options.component.scss']
})
export class PackageOptionsComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() focusPackage: Package;
    packageType = PACKAGE_TYPE;
    itemType = ITEM_TYPE;
    selectedOption: string;

    exteriorPackageItems: PackageItem[];
    interiorPackageItems: PackageItem[];

    constructor() {
        this.exteriorPackageItems = [];
        this.interiorPackageItems = [];
        this.selectedOption = '';
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.updatePackageItemLists();
    }

    ngOnChanges() {
        console.log('Changed');
        // this.updatePackageItemLists();
    }

    public updatePackageItemLists(): void {
        this.exteriorPackageItems = [];
        this.interiorPackageItems = [];
        for (let i = 0; i < this.focusPackage.packageItems.length; i++) {
            if (this.focusPackage.packageItems[i].itemType === ITEM_TYPE.INTERIOR) {
                this.interiorPackageItems.push(this.focusPackage.packageItems[i]);
            } else if (this.focusPackage.packageItems[i].itemType === ITEM_TYPE.EXTERIOR) {
                this.exteriorPackageItems.push(this.focusPackage.packageItems[i]);
            }
        }
    }

    buttonToggle(event, index, focusArray) {
        event.target.classList.toggle('selected');
        focusArray[index].isSelected = this.focusPackage.packageItems[index].isSelected === false;
    }
}
