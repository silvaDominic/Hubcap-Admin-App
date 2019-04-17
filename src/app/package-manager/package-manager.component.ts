import {Component, OnInit} from '@angular/core';
import {Package} from './shared/package.model';
import {PackageService} from '../shared/services/package.service';

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

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
        this.getAllPackages();
    }

    setFocusPackage(_package: Package) {
        this.focusPackage = _package;
    }

    getAllPackages() {
        this.packageService.getAllPackages()
            .subscribe(packages => this.packages = packages,
                    error => this.error = error,
                () => this.setFocusPackage(this.packages[1])
            );
    }

    updatePackages(updatedPackages: Package[]) {
        this.packageService.updatePackages(updatedPackages)
            .subscribe(packages => this.packages = packages,
                error => this.error = <any>error,
                () => console.log('PACKAGE LIST: ', this.packages));
    }
}
