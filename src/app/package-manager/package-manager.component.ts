import {Component, OnInit} from '@angular/core';
import {Package} from './shared/package.model';
import {PackageService} from '../package-items/package.service';

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
        this.showAllPackages();
    }

    setFocusPackage(_package: Package) {
        this.focusPackage = _package;
        console.log('PACKAGE LIST: ', this.packages);
    }

    showAllPackages() {
        this.packageService.getAllPackages()
            .subscribe(packages => this.packages = packages,
                    error => this.error = error,
                () => this.setFocusPackage(this.packages[1])
            );
    }

    updatePackages(packages) {
        this.packageService.updatePackages(packages);
        console.log('PACKAGE LIST: ' + packages);
    }
}
