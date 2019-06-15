import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Package} from '../../package-manager/shared/package.model';
import {Observable} from 'rxjs';
import {PackageItem} from '../../package-manager/shared/package.item.model';

@Injectable({
    providedIn: 'root',
})
export class PackageService {
    washPackagesUrl = 'http://localhost:4200/assets/data/wash-packages.json';
    detailPackagesUrl = 'http://localhost:4200/assets/data/detail-packages.json';
    washPackageItemsUrl = 'http://localhost:4200/assets/data/wash-package-items.json';
    detailPackageItemsUrl = 'http://localhost:4200/assets/data/detail-package-items.json';
    allPackageItemsUrl = 'http://localhost:4200/assets/data/all-package-items.json';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
        })
    };

    constructor(private http: HttpClient) {}


    // Wash Packages
    fetchAllWashPackages(): Observable<Package[]> {
        return this.http.get<Package[]>(this.washPackagesUrl);
    }

    fetchAllWashPackageItems(): Observable<PackageItem[]> {
        return this.http.get<PackageItem[]>(this.washPackageItemsUrl);
    }

    updateWashPackages(_packages: Package[]): Observable<Package[]> {
        return this.http.put<Package[]>(this.washPackagesUrl, _packages);
    }


    // Detail Packages
    fetchAllDetailPackages(): Observable<Package[]> {
        return this.http.get<Package[]>(this.detailPackagesUrl);
    }

    fetchAllDetailPackageItems(): Observable<PackageItem[]> {
        return this.http.get<PackageItem[]>(this.detailPackageItemsUrl);
    }

    updateDetailPackages(_packages: Package[]): Observable<Package[]> {
        return this.http.put<Package[]>(this.detailPackagesUrl, _packages);
    }

    // All Packages
    fetchAllPackageItems(): Observable<PackageItem[]> {
        return this.http.get<PackageItem[]>(this.allPackageItemsUrl);
    }
}
