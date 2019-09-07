import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PackageOptionsComponent} from './components/package-options/package-options.component';
import {PackageService} from '../../_shared/services/package.service';
import {SERVICE_TYPE} from '../../_shared/enums/SERVICE_TYPE';
import {CONSTANTS} from '../../_shared/CONSTANTS';

@Component({
    selector: 'app-package-manager',
    templateUrl: './package-manager.component.html',
    styleUrls: ['./package-manager.component.scss']
})
export class PackageManagerComponent implements OnInit, AfterViewInit {
    @ViewChild(PackageOptionsComponent, {static : false}) packageOptionsComp;
    public selectedPackageType: SERVICE_TYPE;

    // Used for comparison
    E_PACKAGE_TYPE = SERVICE_TYPE;

    constructor(private packageService: PackageService) {
        this.selectedPackageType = SERVICE_TYPE.WASH;
    }

    public ngOnInit() {
        // Initialized package and set relevant fields
        this.packageService.stagePackages(SERVICE_TYPE.WASH);
    }

    public ngAfterViewInit(): void {
        this.packageOptionsComp.refreshPackageOptions();
    }


    // Handles changing between Wash and Detail packages
    public changePackageType(packageType: string) {
        this.selectedPackageType = SERVICE_TYPE[packageType];
        this.packageService.stagePackages(this.selectedPackageType);
        this.setFocusPackage(0);
    }

    public setFocusPackage(index: number) {
        // Stage package to be used in sub-components
        this.packageService.getPackage(index);
        this.packageOptionsComp.refreshPackageOptions();
    }
}
