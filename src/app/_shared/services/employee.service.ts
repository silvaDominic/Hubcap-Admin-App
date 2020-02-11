import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ROLE} from '../enums/ROLE';
import {Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../models/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    static permissionLevel = ROLE;
    static permissionKeys = Object.keys(ROLE);
    static roleMap: Map<ROLE, string> = new Map([
        [ROLE.FULL_ADMIN, 'Full Admin'],
        [ROLE.LOCAL_ADMIN, 'Local Admin'],
        [ROLE.FIELD_WORKER, 'Field Worker'],
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

    fetchAllUsers(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.usersUrl)
    }

    fetchUser(): Observable<Employee> {
        return this.http.get<Employee>(this.currentUserUrl);
    }

    newUser(user: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.usersUrl, user);
    }

    updateUser(user: Employee): Observable<Employee> {
        return this.http.put<Employee>(this.currentUserUrl, user);
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
            permissionLevel: [apiResponse.permissionLevel],
            isActive: [apiResponse.isActive],
            isRegistered: [apiResponse.isRegistered]
        });
    }

}
