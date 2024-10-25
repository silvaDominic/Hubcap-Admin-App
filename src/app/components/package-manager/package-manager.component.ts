import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PackageOptionsComponent} from './components/package-options/package-options.component';
import {PackageService} from '../../_shared/services/package.service';
import {SERVICE_TYPE} from '../../_shared/enums/SERVICE_TYPE';
import {CarwashService} from '../../_shared/services/carwash.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-package-manager',
    templateUrl: './package-manager.component.html',
    styleUrls: ['./package-manager.component.scss']
})
export class PackageManagerComponent implements OnInit, OnDestroy {
    @ViewChild(PackageOptionsComponent, {static : false}) packageOptionsComp;

    // Used for comparison
    E_PACKAGE_TYPE = SERVICE_TYPE;

    constructor(private route: ActivatedRoute, private carwashService: CarwashService, public readonly packageService: PackageService) {
    }

    public ngOnInit() {
        console.log('package-manager init');
        if (this.packageService.getPackageArrayLength() <= 0) {
            this.packageService.creatingNewPackage = true;
        }
    }

    public ngOnDestroy(): void {
        console.log('COMP DESTORYED INITIATED');
        if (this.packageService.creatingNewPackage) {
            this.packageService.cancelNewPackage();
        }
    }

    public changeServiceType(serviceType: SERVICE_TYPE) {
        this.packageService.changeServiceType((serviceType));
        this.packageOptionsComp.resetForm();
    }

    // Sets focus to selected package and displays related package options
    public setFocusPackage(index: number) {
        // Stage package to be used in sub-components
        if (index == this.packageService.currentPackageIndex) {
            console.log('Index is the same. setPackage() call denied');
        } else {
            this.packageService.setPackage(index);
            this.packageOptionsComp.resetForm();
            this.packageService.refreshDisplayPackageOptions();
        }
    }
}
