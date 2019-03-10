import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Package} from '../package-manager/shared/package.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PackageService {
    packagesUrl = 'http://localhost:4200/assets/data/packages.json';


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

    updatePackages(_packages: Package[]): Observable<Package[]> {
        return this.http.put<Package[]>(this.packagesUrl, _packages);
    }
}
