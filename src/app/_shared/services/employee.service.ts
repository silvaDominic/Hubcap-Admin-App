import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../models/employee.model';
import {constants} from '../constants';
import {ApiService} from '../../_core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {DeleteEmployeeObject, EmployeeObject, NewEmployeeObject, PackageObject} from '../interfaces/post.interface';
import {environment} from '../../../environments/environment';
import {CarwashService} from './carwash.service';
import {UserService} from '../../_core/services/user.service';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Role} from '../models/role.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    public readonly employeeArraySubject = new BehaviorSubject(<Employee[]>[]);
    private _employeeArray: Observable<Employee[]> = this.employeeArraySubject.asObservable();
    public serviceReady: boolean;

    constructor(private readonly http: HttpClient,
                private readonly fb: FormBuilder,
                private readonly apiService: ApiService,
                private readonly activatedRoute: ActivatedRoute,
                private readonly carwashService: CarwashService,
                private readonly userService: UserService,
                private readonly snackBar: MatSnackBar
    ) {
        this.activatedRoute.data.pipe(
            map(data => {
                console.log('Activated Route Data: ', data);
            })
        );
    }

    public getBlankForm(): FormGroup {
        return this.generateEmployeeForm(Employee.EMPTY_MODEL);
    }

    public getFormById(id: string): FormGroup {
        const employeeIndex = this.getEmployeeIndexById(id);
        const employee = this.employeeArraySubject.getValue()[employeeIndex];
        return this.generateEmployeeForm(employee);
    }

    public getEmployeeIndexById(id: string) {
        return this.employeeArraySubject.getValue().findIndex(employee => employee.id === id);
    }

    // Makes a request to create a new employee slot based on the role
    // Returns a 6-digit employee code in the form of a string
    public createEmployee(employeeRoleForm: FormGroup): Promise<string> {
        console.log('New Employee request made');
        console.log('Fetching Employee Code from DB');

        const role = employeeRoleForm.get('role').value;

        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', constants.DEFAULT_CONTENT_TYPE);
        httpHeaders.set('Authorization', constants.TOKEN_KEY_NAME + ' ' + this.userService.getToken()); // { Authorization: Bearer Token [TOKEN] }

        const postObject: NewEmployeeObject = {
            carWashId: this.carwashService.getStoreId(),
            employeeRole: role,
        };

        console.log('Post Object: ', postObject);

        // Make post and return promise
        return this.apiService.post(environment.new_employee_url, new HttpParams(), httpHeaders, postObject).pipe(take(1)).toPromise();
    }

    // This method might change
    public updateEmployee(userFormGroup: FormGroup, userId): Promise<boolean> {
        const updatedEmployee = new Employee(
            userId,
            userFormGroup.get('firstName').value,
            userFormGroup.get('lastName').value,
            userFormGroup.get('email').value,
            userFormGroup.get('phoneNumber').value,
            userFormGroup.get('storeIds').value,
            userFormGroup.get('role').value,
            userFormGroup.get('isActive').value,
            userFormGroup.get('isRegistered').value,
        );

        console.log('Updating employee: ', updatedEmployee);

        return this.postUpdateEmployee(updatedEmployee).then((res: Employee) => {
            console.log('Employee Post SUCCESS', res);

            const currentEmployeeArray = this.employeeArraySubject.getValue();
            // Update employee array with newly updated employee
            currentEmployeeArray[this.getEmployeeIndexById(updatedEmployee.id)] = updatedEmployee;

            // Update behavior subject
            this.employeeArraySubject.next(currentEmployeeArray);

            return true;

        }).catch(reason => {
            console.warn('Error CREATING employee: ', updatedEmployee);
            console.warn(reason);
            return false;
        });
    }

    private postUpdateEmployee(updatedEmployee: Employee): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', constants.DEFAULT_CONTENT_TYPE);
        httpHeaders.set('Authorization', constants.TOKEN_KEY_NAME + ' ' + this.userService.getToken()); // { Authorization: Bearer Token [TOKEN] }

        const postObject: EmployeeObject = {
            carWashId: this.carwashService.getStoreId(),
            employee: updatedEmployee,
        };

        console.log('Post Object: ', postObject);

        // Make post and return promise
        return this.apiService.post(environment.new_employee_url, new HttpParams(), httpHeaders, postObject).pipe(take(1)).toPromise();
    }

    // Delete package from database and remove locally
    deleteEmployee(id: string): Promise<boolean> {
        const currentEmployeeArray = this.employeeArraySubject.getValue();

        return new Promise<boolean>(((resolve, reject) => {
            currentEmployeeArray.some(
                (employee, i) => {
                    if (employee.id === id) {
                        return this.deleteEmployeeFromDB(id).then((result) => {
                                console.log('Employee deletion SUCCESS: ', result);
                                currentEmployeeArray.splice(i, 1);

                                this.employeeArraySubject.next(currentEmployeeArray);
                                resolve(true);
                            }
                        ).catch(reason => {
                            reject('Error DELETING employee: ' + employee.id);
                        });
                    } else if (i == currentEmployeeArray.length - 1) {
                        reject('Employee with ID: ' + id + ' does not exist. Try again or contact your Admin for help');
                    }
                }
            );
        }));
    }

    private deleteEmployeeFromDB(id: string): Promise<any> {
        // Set HttpHeaders
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', constants.DEFAULT_CONTENT_TYPE);
        httpHeaders.set('Authorization', constants.TOKEN_KEY_NAME + ' ' + this.userService.getToken()); // { Authorization: Bearer Token [TOKEN] }

        const postObject: DeleteEmployeeObject = {
            carWashId: this.carwashService.getStoreId(),
            employeeId: id
        };

        // Make post and return promise
        return this.apiService.post(environment.delete_employee_url, new HttpParams(), httpHeaders, postObject).pipe(take(1)).toPromise();

    }

    /* --------------------- FORM METHODS ------------------------- */

    public generateRoleForm(): FormGroup {
        return this.fb.group({
            role: [null, Validators.required]
        })
    }

    public generateEmployeeForm(apiResponse: any): FormGroup {
        return this.fb.group({
            id: [apiResponse.id],
            firstName: [apiResponse.firstName,
                [
                    Validators.required,
                    Validators.pattern(constants.ALPHABET_NORM_VALIDATOR),
                    Validators.maxLength(constants.FIRST_NAME_MAX_LENGTH_VALIDATOR)
                ]
            ],
            lastName: [apiResponse.lastName,
                [
                    Validators.required,
                    Validators.pattern(constants.ALPHABET_NORM_VALIDATOR),
                    Validators.maxLength(constants.LAST_NAME_MAX_LENGTH_VALIDATOR)
                ]
            ],
            email: [apiResponse.email,
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            phoneNumber: [apiResponse.phoneNumber,
                [
                    Validators.required,
                    Validators.minLength(constants.PHONE_NUM_MIN_LENGTH_VALIDATOR)
                ]
            ],
            storeIds: [apiResponse.storeIds],
            password: [apiResponse.password,
                [
                    Validators.required,
                    Validators.minLength(constants.PASSWORD_MIN_LENGTH_VALIDATOR),
                    Validators.maxLength(constants.PASSWORD_MAX_LENGTH_VALIDATOR)
                ]
            ],
            role: [apiResponse.role,
                [
                    Validators.required
                ]
            ],
            isActive: [apiResponse.isActive],
            isRegistered: [apiResponse.isRegistered]
        });
    }

    /* --------------------- UTIL METHODS ------------------------- */

    public openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 7000,
        });
    }

}
