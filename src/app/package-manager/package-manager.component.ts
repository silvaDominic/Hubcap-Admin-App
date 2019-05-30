import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Package} from './shared/package.model';
import {PackageService} from '../shared/services/package.service';
import {PACKAGE_TYPE} from '../shared/models/PACKAGE_TYPE.model';

@Component({
    selector: 'app-package-manager',
    templateUrl: './package-manager.component.html',
    styleUrls: ['./package-manager.component.scss'],
    providers: [PackageService]
})
export class PackageManagerComponent implements OnInit {
    packages: Package[];
    error: string;
    focusPackage: Package;
    packageType = PACKAGE_TYPE;
    selectedPackageType = PACKAGE_TYPE.WASH;

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
        this.getAllWashPackages();
    }

    setFocusPackage(_package: Package) {
        this.focusPackage = _package;
    }

    getAllWashPackages() {
        this.packageService.fetchAllWashPackages()
            .subscribe(packages => this.packages = packages,
                    error => this.error = error,
                () => this.setFocusPackage(this.packages[1])
            );
    }

    getAllDetailPackages() {
        this.packageService.fetchAllDetailPackages()
            .subscribe(packages => this.packages = packages,
                error => this.error = error,
                () => this.setFocusPackage(this.packages[1])
            );
    }

    updateWashPackages(updatedPackages: Package[]) {
        this.packageService.updateWashPackages(updatedPackages)
            .subscribe(packages => this.packages = packages,
                error => this.error = <any>error,
                () => console.log('PACKAGE LIST: ', this.packages));
    }

    updateDetailPackages(updatedPackages: Package[]) {
        this.packageService.updateDetailPackages(updatedPackages)
            .subscribe(packages => this.packages = packages,
                error => this.error = <any>error,
                () => console.log('PACKAGE LIST: ', this.packages));
    }

    changePackageType(packageType: string) {
        if (packageType === PACKAGE_TYPE.WASH) {
            this.selectedPackageType = PACKAGE_TYPE.WASH;
            this.getAllWashPackages();
        } else if (packageType === PACKAGE_TYPE.DETAIL) {
            this.selectedPackageType = PACKAGE_TYPE.DETAIL;
            this.getAllDetailPackages();
        }
    }
}
