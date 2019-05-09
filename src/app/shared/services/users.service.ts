import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../../user-manager/shared/models/user.model';
import {PERMISSION_LEVEL} from '../models/PERMISSION_LEVEL.model';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Role} from '../../user-manager/shared/models/role.model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    static permissionLevel = PERMISSION_LEVEL;
    static permissionKeys = Object.keys(PERMISSION_LEVEL);
    static roleMap: Map<PERMISSION_LEVEL, string> = new Map([
        [PERMISSION_LEVEL.FULL_ADMIN_CONTROL, 'Full Admin'],
        [PERMISSION_LEVEL.LOCAL_ADMIN_CONTROL, 'Local Admin'],
        [PERMISSION_LEVEL.FIELD_CONTROL, 'Field Worker'],
                                                          ]);

    private usersUrl = 'http://localhost:4200/assets/data/users.json';
    private currentUserUrl = 'http://localhost:4200/assets/data/current-user.json';

    static generatePassword() {
        return Math.random().toString(); // Will be made more comprehensive in the future
    }

    static generateUserId() {
        return '#' + Math.random().toString(); // Will be made more comprehensive in the future
    }

    constructor(private readonly http: HttpClient, private readonly fb: FormBuilder) {}

    fetchAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl)
    }

    fetchUser(): Observable<User> {
        return this.http.get<User>(this.currentUserUrl);
    }

    newUser(user: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(this.currentUserUrl, user);
    }

    public generateUserForm(apiResponse: any): FormGroup {
        return this.fb.group({
            id: [apiResponse.id],
            firstName: [apiResponse.firstName, Validators.required],
            lastName: [apiResponse.lastName, Validators.required],
            email: [apiResponse.email, Validators.required, Validators.email],
            phoneNumber: [apiResponse.phoneNumber, Validators.required],
            storeIds: [apiResponse.storeIds],
            password: [apiResponse.password],
            role: [apiResponse.role],
            isActive: [apiResponse.isActive],
            isRegistered: [apiResponse.isRegistered]
        });
    }

}
