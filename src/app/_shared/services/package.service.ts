import {Injectable} from '@angular/core';
import {Package} from '../../package-manager/shared/package.model';
import 'rxjs/add/operator/map';
import {CarwashService} from './carwash.service';
import {PackageItem} from '../../package-manager/shared/package.item.model';
import {CONSTANTS} from '../models/CONSTANTS';
import {HttpClient} from '@angular/common/http';
import {SERVICE_TYPE} from '../models/PACKAGE_TYPE.model';


@Injectable({
    providedIn: 'root',
})
export class PackageService {
    private package: Package;
    private allPackageItems: PackageItem[];

    constructor(private carwashService: CarwashService, private http: HttpClient) {
        this.allPackageItems = [];
    }

    // Initializes package
    public stagePackage(packageName: string) {
        this.package = this.carwashService.getPackage(packageName);
        this.allPackageItems = this.carwashService.getAllPackageItems();
        console.log('SELECTED PACKAGE: ', this.package);
    }

    public getPackage(): Package {
        if (!this.package) {
            console.log('No package staged!');
            console.log('Setting default WASH PACKAGE');
            this.stagePackage(CONSTANTS.DEFAULT_WASH_PACKAGE);
        }
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
