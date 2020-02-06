import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {AdminUser} from '../models/admin-user.model';
import {environment} from '../../../environments/environment';
import {ROLE} from '../../_shared/enums/ROLE';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private currentUserSubject = new BehaviorSubject<AdminUser>(AdminUser.EMPTY_MODEL);
    private _currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private readonly apiService: ApiService,
        private readonly http: HttpClient,
        private readonly jwtService: JwtService,
    ) {
        console.log('Init User Service');
    }

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    public populate(): void {
        // If JWT detected, attempt to get & store user's info
        if (this.jwtService.getToken()) {
            console.log('getToken() returned something', this.jwtService.getToken());
            this.apiService.get(environment.users_url, new HttpParams(), new HttpHeaders().set('Authorization', this.jwtService.getToken().toString()))
                .subscribe(
                    data => {
                        this.setAuth(data.adminUser);
                    },
                    err => this.purgeAuth()
                );
        } else {
            // Remove any potential remnants of previous auth states
            console.log('No token detected. Purging Auth');
            this.purgeAuth();
        }
    }

    public setAuth(adminUser: AdminUser): void {
        // Save JWT sent from server contained in cookie
        // this.jwtService.saveToken(adminUser.token); // Retrieve token from authorization (header), NOT body
        // Set current user data into observable
        this.currentUserSubject.next(adminUser);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    public get currentUser(): Observable<AdminUser> {
        return this._currentUser;
    }

    public getCurrentUserValue(): AdminUser {
        return this.currentUserSubject.getValue();
    }

    public purgeAuth() {
        console.log('PURGE AUTH CALLED');
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next(AdminUser.EMPTY_MODEL);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }

    public attemptAuth(type, credentials): Observable<AdminUser> {
        const route = (type === 'login') ? '/login' : '';
        
        const validUser = {
            "email": "dom.92@live.com",
            "password": "1password",
        };

        if (credentials.email == validUser.email && credentials.password == validUser.password) {
            const currentUser = new AdminUser(
                validUser.email,
                validUser.password,
                ROLE.FIELD_WORKER
            );

            this.setAuth(currentUser);
            console.log('Attempt success. Logging in.');
            return of(currentUser);
        }
        
/*        return this.apiService.post(environment.users_url + route, new HttpParams(), new HttpHeaders(), {adminUser: credentials})
            .map(
                data => {
                    this.setAuth(data.adminUser);
                    return data;
                }
            );*/
    }

    // Update the user on the server (email, pass, etc)
    public update(adminUser): Observable<AdminUser> {
        return this.apiService
            .post(environment.users_url, new HttpParams().set(adminUser, adminUser)) // TODO Look into this
            .map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.adminUser);
                return data.adminUser;
            });
    }
}
