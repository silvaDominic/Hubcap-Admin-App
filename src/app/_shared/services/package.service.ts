import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CarwashService} from './carwash.service';
import {HttpClient} from '@angular/common/http';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {Package} from '../models/package.model';
import {PackageItem} from '../models/package.item.model';


@Injectable({
    providedIn: 'root',
})
export class PackageService {
    private package: Package;
    private packages: Package[];
    private allPackageItems: PackageItem[];

    constructor(private carwashService: CarwashService, private http: HttpClient) {
        this.allPackageItems = [];
    }

    // Initializes package
    public stagePackages(type: SERVICE_TYPE) {
        this.packages = this.carwashService.getAllPackages(type);
        this.allPackageItems = this.carwashService.getAllPackageItems();
        console.log('SELECTED PACKAGE: ', this.package);
    }

    public getAllPackages(): Package[] {
        if (!this.packages) {
            console.log('No packages staged!');
            console.log('Setting default type to WASH PACKAGES');
        }
        return this.packages;
    }

    public getPackage(index: number): Package {
        this.package = this.packages[index];
        return this.package;
    }

    public getType(): SERVICE_TYPE {
        return this.package.type;
    }

    public getPackageItems(): PackageItem[] {
        return this.package.packageItems;
    }

    // Static list of packages
    public getAllPackageItems(): PackageItem[] {
        return this.carwashService.getAllPackageItems();
    }


}
