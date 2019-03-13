import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Package} from '../../package-manager/shared/package.model';
import {Observable} from 'rxjs';
import {PackageItem} from '../../package-manager/shared/package.item.model';

@Injectable({
    providedIn: 'root',
})
export class PackageService {
    packagesUrl = 'http://localhost:4200/assets/data/packages.json';
    packageItemsUrl = 'http://localhost:4200/assets/data/package.items.json';


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
        })
    };

    constructor(private http: HttpClient) {}

    getAllPackages(): Observable<Package[]> {
        return this.http.get<Package[]>(this.packagesUrl);
    }

    getAllPackageItems(): Observable<PackageItem[]> {
        return this.http.get<PackageItem[]>(this.packageItemsUrl);
    }

    updatePackages(_packages: Package[]): Observable<Package[]> {
        return this.http.put<Package[]>(this.packagesUrl, _packages);
    }
}
