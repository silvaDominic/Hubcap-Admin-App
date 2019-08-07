import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SERVICE_TYPE} from '../../../_shared/models/PACKAGE_TYPE.model';
import {Package} from '../../shared/package.model';
import {VEHICLE_TYPE} from '../../../_shared/models/VEHICLE_TYPE.model';
import {PackageItem} from '../../shared/package.item.model';
import {PackageService} from '../../../_shared/services/package.service';
import {CONSTANTS} from '../../../_shared/models/CONSTANTS';
import {ALL_PACKAGES} from '../../../_shared/models/ALL_PACKAGES.model';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {

    public package: Package;
    @Output() packageSelect = new EventEmitter<string>();
    @Input() selectedPackageType: SERVICE_TYPE;

    // Initialize Enums
    E_PACKAGE_TYPE = SERVICE_TYPE;
    E_ALL_PACKAGES = ALL_PACKAGES;

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
        // Initialize package
        this.package = this.packageService.getPackage();
    }

    callSetFocusPackage(packageId: string) {
        this.packageSelect.emit(packageId);
        this.package = this.packageService.getPackage();
    }
}
