import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../../user-manager/shared/models/user.model';
import {PERMISSION_LEVEL} from '../models/PERMISSION_LEVEL.model';
import {Observable} from 'rxjs';
import {Promotion} from '../../promo-manager/shared/promotion.model';

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

    static generatePassword() {
        return Math.random().toString(); // Will be made more comprehensive in the future
    }

    static generateUserId() {
        return '#' + Math.random().toString(); // Will be made more comprehensive in the future
    }

    constructor(private http: HttpClient) {}

    fetchAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.usersUrl)
    }

    newUser(user: User): Observable<User> {
        return this.http.post<User>(this.usersUrl, user);
    }
}
