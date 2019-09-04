import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ALL_PACKAGES} from '../../../../_shared/enums/ALL_PACKAGES.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {Package} from '../../../../_shared/models/package.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/PACKAGE_TYPE.model';

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
