import {Injectable} from '@angular/core';
import {distinctUntilChanged, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {User} from '../models/admin-user.model';
import {environment} from '../../../environments/environment';
import {constants} from '../../_shared/constants';
import {ROLE} from '../../_shared/enums/ROLE';
import {RouteInfo} from '../interfaces/route-info.interface';
import {map} from 'rxjs/operators';
import {LoginCredentials, RegisterCredentials} from '../../_shared/interfaces/credentials.interface';


@Injectable({
    providedIn: 'root',
})
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(User.EMPTY_MODEL);
    private _currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

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
            this.apiService.get(environment.user_sign_in_url, new HttpParams(), new HttpHeaders().set('Authorization', this.jwtService.getToken()))
                .subscribe({
                    next: (data) => {
                        console.log('User Valid, Starting App');
                        this.setAuth(data);
                    },
                    error: (error) => this.purgeAuth()
                });
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
    public attemptRegistryAuth(credentials: RegisterCredentials) {
        // Delete or comment out when testing real API calls
        return this.fakeRegisterResponse(credentials).pipe(
            map((user: User) => {
                if (user.token) {
                    this.setAuth(user);
                    return user;
                } else {
                    console.log('Auth attempt failure');
                    console.log('Throwing error');
                    throw throwError(new Error('Invalid Registry'));
                }
            })
        );

        // Uncomment this to test API call for REGISTER
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', constants.DEFAULT_CONTENT_TYPE);
        httpHeaders.set('Authorization', constants.TOKEN_KEY_NAME + ' ' + this.jwtService.getToken()); // { Authorization: Bearer [TOKEN] }

        return this.apiService.post(environment.register_url, new HttpParams(), httpHeaders, {credentials}).pipe(
            map(
                user => {
                    this.setAuth(user);
                    return user;
                }
            )
        );
    }

    // WARNING: This method contains test code -- NOT FINAL
    public attemptLoginAuth(credentials: LoginCredentials): Observable<User> {

        // Delete or comment out when testing real API calls
        return this.fakeLoginResponse(credentials).pipe(
            map(user => {
                if (user.token) {
                    this.setAuth(user);
                    return user;
                } else {
                    console.log('Auth attempt failure');
                    console.log('Throwing error');
                    throw new Error('Invalid Login');
                }
            })
        );

        // Uncomment this to test API call for LOGIN
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', constants.DEFAULT_CONTENT_TYPE);
        httpHeaders.set('Authorization', constants.TOKEN_KEY_NAME + ' ' + this.jwtService.getToken()); // { Authorization: Bearer [TOKEN] }

        return this.apiService.post(environment.signIn_url, new HttpParams(), httpHeaders, {credentials}).pipe(
            map(
                user => {
                    this.setAuth(user);
                    return user;
                }
            )
        );
    }

    // TEST METHOD
    private fakeLoginResponse(credentials: LoginCredentials): Observable<User> {
        if (credentials.userName === constants.VALID_USER.email && credentials.password === constants.VALID_USER.password) {
            console.log('Attempt success. Logging in.');
            return of(constants.VALID_USER);
        } else {
            console.log('Attempt failure. Redirecting to Login.');
            console.log('Throwing error');
            throw new Error('Invalid Registry');
        }
    }

    // TEST METHOD
    private fakeRegisterResponse(credentials: RegisterCredentials): Observable<User> {
        console.log('Submitted Register credentials: ', credentials);
        if (credentials.registryCode === constants.REGISTRY_CODE) {
            console.log('Attempt success. Registering User.');
            return of(constants.VALID_USER);
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
            return constants.ADMIN_ROUTES.concat(constants.BASE_ROUTES);
        } else if (currentUserRole === ROLE.FIELD_WORKER) {
            return constants.BASE_ROUTES;
        } else {
            console.warn('Error setting ROUTES');
        }
    }
}
