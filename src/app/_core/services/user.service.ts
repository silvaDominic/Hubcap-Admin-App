import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import {AdminUser} from '../models/admin-user.model';
import {CarwashService} from '../../_shared/services/carwash.service';


@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<AdminUser>(new AdminUser());
    public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService,
        private carWashService: CarwashService
    ) {}

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            console.log('getToken() returned something');
            this.apiService.get('/user', new HttpParams(), new HttpHeaders().set('Authorization', this.jwtService.getToken().toString()))
                .subscribe(
                    data => this.setAuth(data.adminUser),
                    err => this.purgeAuth()
                );
            // this.carWashService.registerCarwash();
        } else {
            // Remove any potential remnants of previous auth states
            this.purgeAuth();
        }
    }

    setAuth(adminUser: AdminUser) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(adminUser.token);
        // Set current user data into observable
        this.currentUserSubject.next(adminUser);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next(new AdminUser());
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type, credentials): Observable<AdminUser> {
        const route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, new HttpParams(), new HttpHeaders(), {adminUser: credentials})
            .map(
                data => {
                    this.setAuth(data.adminUser);
                    return data;
                }
            );
    }

    // Update the user on the server (email, pass, etc)
    update(adminUser): Observable<AdminUser> {
        return this.apiService
            .put('/user', { adminUser })
            .map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.adminUser);
                return data.adminUser;
            });
    }
}
