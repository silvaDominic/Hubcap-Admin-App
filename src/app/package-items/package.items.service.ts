import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PackageItem} from '../package-manager/shared/package.item.model';
import {Menu} from '../package-manager/shared/menu.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PackageItemsService {
    packageItemsUrl = 'http://localhost:4200/assets/data/package-items.json';
    defaultPackagesUrl = 'http://localhost:4200/assets/data/package-defaults.json';

    constructor(private http: HttpClient) {}

    getAllPackageItems(): Observable<PackageItems> {
        return this.http.get<PackageItems>(
            this.packageItemsUrl
        );
    }

    getAllPackageDefaults(): Observable<MenuList> {
        return this.http.get<MenuList>(
            this.defaultPackagesUrl
        );
    }
}

export interface PackageItems {
    name: string;
    items: PackageItem[];
}

export interface MenuList {
    name: string;
    menus: Menu[];
}
