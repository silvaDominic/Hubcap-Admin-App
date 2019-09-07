import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ALL_PACKAGES} from '../../../../_shared/enums/ALL_PACKAGES.model';
import {PackageService} from '../../../../_shared/services/package.service';
import {Package} from '../../../../_shared/models/package.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {

    public package: Package;
    public packages: Package[];
    @Output() packageSelect = new EventEmitter<number>();
    @Input() selectedPackageType: SERVICE_TYPE;

    // Initialize Enums
    E_ALL_PACKAGES = ALL_PACKAGES;

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
        // Initialize package
        this.packages = this.packageService.getAllPackages();
        this.package = this.packageService.getPackage(0);
    }

    callSetFocusPackage(index: number) {
        // const packageInfo = {index, type};
        this.packageSelect.emit(index);
        this.package = this.packageService.getPackage(index);
    }
}
