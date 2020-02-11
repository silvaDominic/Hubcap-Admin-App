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
import {User} from '../models/admin-user.model';
import {environment} from '../../../environments/environment';
import {ROLE} from '../../_shared/enums/ROLE';
import {UserCredentials} from '../../_shared/models/user-credentials.model';
import {CONSTANTS} from '../../_shared/CONSTANTS';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(User.EMPTY_MODEL);
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

    public setAuth(adminUser: User): void {
        // Save JWT sent from server contained in cookie
        this.jwtService.saveToken(adminUser.token);
        // Set current user data into observable
        this.currentUserSubject.next(adminUser);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    public get currentUser(): Observable<User> {
        return this._currentUser;
    }

    public getCurrentUserValue(): User {
        return this.currentUserSubject.getValue();
    }

    public getToken(): string {
        return this.currentUserSubject.getValue().token;
    }

    public purgeAuth() {
        console.log('PURGE AUTH CALLED');
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next(User.EMPTY_MODEL);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
    }

    public attemptAuth(type, credentials): Observable<User> {
        const route = (type === 'login') ? '/login' : '';

        if (this.fakeResponse(credentials) == true) {
            this.setAuth(CONSTANTS.VALID_USER);
            return of(CONSTANTS.VALID_USER);
        } else {
            this.purgeAuth();
            return;
        }


        /*        return this.apiService.post(environment.users_url + route, new HttpParams(), new HttpHeaders(), {adminUser: credentials})
                    .map(
                        data => {
                            this.setAuth(data.adminUser);
                            return data;
                        }
                    );*/
    }

    private fakeResponse(credentials: UserCredentials): boolean {

        if (credentials.email === CONSTANTS.VALID_USER.email && credentials.password === CONSTANTS.VALID_USER.password) {
            console.log('Attempt success. Logging in.');
            return true;
        } else if (credentials.adminCode === CONSTANTS.VALID_USER_ADMIN) {
            return true;
        } else {
            console.log('Attempt failure. Redirecting to Login.');
            return false;
        }
    }

    // Update the user on the server (email, pass, etc)
    public update(adminUser): Observable<User> {
        return this.apiService
            .post(environment.users_url, new HttpParams().set(adminUser, adminUser)) // TODO Look into this
            .map(data => {
                // Update the currentUser observable
                this.currentUserSubject.next(data.adminUser);
                return data.adminUser;
            });
    }
}
