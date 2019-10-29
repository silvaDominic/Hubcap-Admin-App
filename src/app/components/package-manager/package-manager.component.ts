import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PackageOptionsComponent} from './components/package-options/package-options.component';
import {PackageService} from '../../_shared/services/package.service';
import {SERVICE_TYPE} from '../../_shared/enums/SERVICE_TYPE';
import {Package} from '../../_shared/models/package.model';

@Component({
    selector: 'app-package-manager',
    templateUrl: './package-manager.component.html',
    styleUrls: ['./package-manager.component.scss']
})
export class PackageManagerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(PackageOptionsComponent, {static : false}) packageOptionsComp;
    public selectedServiceType: SERVICE_TYPE;

    // Used for comparison
    E_PACKAGE_TYPE = SERVICE_TYPE;

    constructor(private readonly packageService: PackageService) {
        this.selectedServiceType = SERVICE_TYPE.WASH;
    }

    public ngOnInit() {
        console.log('package-manager init');
    }

    public ngAfterViewInit(): void {
    }

    public ngOnDestroy(): void {
        console.log('COMP DESTORYED INITIATED');
        if (this.packageService.creatingNewPackage) {
            this.packageService.cancelNewPackage();
        }
    }

    // Handles changing between Wash and Detail packages
    public changeServiceType(packageType: string) {
        this.selectedServiceType = SERVICE_TYPE[packageType];
        this.packageService.setPackageArray(this.selectedServiceType);
        this.packageOptionsComp.refreshPackageOptions();
    }

    // Sets focus to selected package and displays related package options
    public setFocusPackage(index: number) {
        // Stage package to be used in sub-components
        if (index == this.packageService.currentPackageIndex) {
            console.log('Index is same. setPackage call denied');
        } else {
            this.packageService.setPackage(index);
            this.packageOptionsComp.refreshPackageOptions();
            this.packageOptionsComp.packageForm.reset();
        }
    }
}
