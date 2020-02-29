import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
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
import {UserLoginCredentials, UserRegisterCredentials} from '../../_shared/models/user-credentials.model';
import {CONSTANTS} from '../../_shared/CONSTANTS';
import {ROLE} from '../../_shared/enums/ROLE';
import {RouteInfo} from '../models/route-info.interface';
import {map} from 'rxjs/operators';


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
            this.apiService.get(environment.users_url, new HttpParams(), new HttpHeaders().set('Authorization', this.jwtService.getToken()))
                .subscribe(
                    data => {
                        console.log('User Valid, Starting App');
                        this.setAuth(data);
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

    // WARNING: This method contains test code -- NOT FINAL
    public attemptAuth(type, credentials): Observable<User> {
        if (type === 'login') {
            return this.fakeLoginResponse(credentials).pipe(
                map(user => {
                    if (user.token) {
                        this.setAuth(user);
                        return user;
                    } else {
                        console.log('Auth attempt failure');
                        console.log('Throwing error');
                        throw throwError(new Error('Invalid Login'));
                    }
                })
            );
        } else if (type === 'register') {
            return this.fakeRegisterResponse(credentials).pipe(
                map(user => {
                    if (user.token) {
                        this.setAuth(user);
                        return user;
                    } else {
                        console.log('Auth attempt failure');
                        console.log('Throwing error');
                        throw throwError(new Error('Invalid Login'));
                    }
                })
            );
        } else {
            console.warn('Error attempting Authentication.');
            console.log('Throwing error');
            throw throwError(new Error('Invalid Login'));
        }

        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', CONSTANTS.DEFAULT_CONTENT_TYPE);
        httpHeaders.set('Authorization', CONSTANTS.TOKEN_KEY_NAME + ' ' + this.getToken()); // { Authorization: Bearer Token [TOKEN] }

        return this.apiService.post(environment.users_url, new HttpParams(), new HttpHeaders(), {user: credentials}).pipe(
            map(
                data => {
                    this.setAuth(data.adminUser);
                    return data;
                }
            )
        );
    }

    // TEST METHOD
    private fakeLoginResponse(credentials: UserLoginCredentials): Observable<User> {
        if (credentials.email === CONSTANTS.VALID_USER.email && credentials.password === CONSTANTS.VALID_USER.password) {
            console.log('Attempt success. Logging in.');
            return of(CONSTANTS.VALID_USER);
        } else {


        }
    }

    // TEST METHOD
    private fakeRegisterResponse(credentials: UserRegisterCredentials): Observable<User> {
        console.log('Submitted Register credentials: ', credentials);
        if (credentials.registryCode === CONSTANTS.REGISTRY_CODE) {
            console.log('Attempt success. Registering User.');
            return of(CONSTANTS.VALID_USER);
        } else {
            console.log('Attempt failure. Redirecting to Login.');
            console.log('Throwing error');
            throw throwError(new Error('Invalid Registry'));
        }
    }

    // Update the user on the server (email, pass, etc)
    public update(user: User): Observable<User> {
        return this.apiService
            .post(environment.assets_url_base + user.firstName + '-user-object.json', new HttpParams()).pipe( // TODO Look into this
                map(_user => {
                    // Update the currentUser observable
                    this.currentUserSubject.next(_user);
                    return _user;
                }));
    }

    public getAllowedRoutes(): RouteInfo[] {
        const currentUserRole = this.currentUserSubject.getValue().role;

        if (currentUserRole !== ROLE.FIELD_WORKER) {
            return CONSTANTS.ADMIN_ROUTES.concat(CONSTANTS.BASE_ROUTES);
        } else if (currentUserRole === ROLE.FIELD_WORKER) {
            return CONSTANTS.BASE_ROUTES;
        } else {
            console.warn('Error setting ROUTES');
        }
    }
}