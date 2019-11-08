import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) {}

    private formatErrors(error: any) {
        return  throwError(error.error);
    }


    get<T>(path: string, httpParams: HttpParams = new HttpParams(), httpHeaders: HttpHeaders = new HttpHeaders()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`, { params: httpParams, headers: httpHeaders })
            .pipe(catchError(this.formatErrors));
    }

    getGeoLocation<T>(httpParams: HttpParams = new HttpParams(), httpHeaders: HttpHeaders = new HttpHeaders()): Observable<any> {
        return this.http.get(environment.geolocation_base_url, { params: httpParams, headers: httpHeaders })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, httpParams: HttpParams = new HttpParams(), httpHeaders: HttpHeaders = new HttpHeaders(), body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, httpParams: HttpParams = new HttpParams(), httpHeaders: HttpHeaders = new HttpHeaders(), body: Object = {}): Observable<any> {
        return this.http.post(
            `${environment.api_url}${path}`,
            JSON.stringify(body),
            {params: httpParams, headers: httpHeaders}
        ).pipe(catchError(this.formatErrors));
    }

    delete(path: string, httpParams: HttpParams = new HttpParams(), httpHeaders: HttpHeaders = new HttpHeaders()): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`,
            {params: httpParams, headers: httpHeaders}
        ).pipe(catchError(this.formatErrors));
    }
}
