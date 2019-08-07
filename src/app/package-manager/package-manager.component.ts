import {Component, OnInit, ViewChild} from '@angular/core';
import {SERVICE_TYPE} from '../_shared/models/PACKAGE_TYPE.model';
import {PackageComponent} from './components/package/package.component';
import {CONSTANTS} from '../_shared/models/CONSTANTS';
import {Package} from './shared/package.model';
import {PackageService} from '../_shared/services/package.service';
import {PackageOptionsComponent} from './components/package-options/package-options.component';

@Component({
    selector: 'app-package-manager',
    templateUrl: './package-manager.component.html',
    styleUrls: ['./package-manager.component.scss']
})
export class PackageManagerComponent implements OnInit {
    @ViewChild(PackageOptionsComponent) packageOptionsComp;
    public selectedPackageType: SERVICE_TYPE;
    public washIconRefs = [];
    public detailIconRefs = [];

    // Used for comparison
    E_PACKAGE_TYPE = SERVICE_TYPE;

    constructor(private packageService: PackageService) {
        this.selectedPackageType = SERVICE_TYPE.WASH;

        this.washIconRefs.push('iconA-wash-bronze.svg');
        this.washIconRefs.push('iconA-wash-silver.svg');
        this.washIconRefs.push('iconA-wash-gold.svg');

        this.detailIconRefs.push('iconA-detail-interior.svg');
        this.detailIconRefs.push('iconA-detail-exterior.svg');
        this.detailIconRefs.push('iconA-detail-both.svg');
    }

    public ngOnInit() {
        // Initialized package and set relevant fields
        this.packageService.stagePackage(CONSTANTS.DEFAULT_WASH_PACKAGE);
        this.packageOptionsComp.refreshPackageOptions();
    }

    // Handles changing between Wash and Detail packages
    public changePackageType(packageType: string) {
        if (packageType === SERVICE_TYPE.WASH) {
            this.selectedPackageType = SERVICE_TYPE.WASH;
            this.setFocusPackage(CONSTANTS.DEFAULT_WASH_PACKAGE);
        } else if (packageType === SERVICE_TYPE.DETAIL) {
            this.selectedPackageType = SERVICE_TYPE.DETAIL;
            this.setFocusPackage(CONSTANTS.DEFAULT_DETAIL_PACKAGE);
        }
    }

    public setFocusPackage(packageId: string) {
        // Stage package to be used in sub-components
        this.packageService.stagePackage(packageId);
        this.packageOptionsComp.refreshPackageOptions();
    }
}
