import {Injectable} from '@angular/core';
import {ApiService} from '../../_core/services/api.service';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {CONSTANTS} from '../CONSTANTS';
import {environment} from '../../../environments/environment';
import {take} from 'rxjs/operators';
import {Client} from '../models/client.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QrScannerService {

    private clientSubject = new BehaviorSubject<Client>(Client.EMPTY_MODEL);
    private _client = this.clientSubject.asObservable();

    constructor(private readonly apiService: ApiService) {}

    public confirmClient(client: Client): Promise<any> {

        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        // httpHeaders.set('Bearer Token', this.userService.getToken());

        console.log('Client Confirmed: ', client);

        // Dummy success call
/*        return new Promise<any>(resolve => {
            resolve(true);
        });*/
        // Make post and return promise for component to resolve
        return this.apiService.post(environment.update_package_url, new HttpParams(), httpHeaders, client).pipe(take(1)).toPromise();
    }

    public get client(): Observable<Client> {
        return this._client;
    }

    public setClient(newClient: Client) {
        this.clientSubject.next(newClient);
    }
}
