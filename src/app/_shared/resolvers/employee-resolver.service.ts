import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ApiService} from '../../_core/services/api.service';
import {Observable} from 'rxjs';
import {Employee} from '../models/employee.model';
import {EmployeeService} from '../services/employee.service';

@Injectable({
    providedIn: 'root',
})
export class EmployeeResolverService implements Resolve<boolean> {
    private static allEmployeesPath = environment.all_employees_url;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private employeeService: EmployeeService
    ) {}

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        // Fetch all employees
        return this.fetchAllEmployees().map(data => {
            if (data == null) {
                console.log('No employees found');
                console.log('Creating empty employee list');
                this.employeeService.employeeArraySubject.next(new Array<Employee>(Employee.EMPTY_MODEL));
                console.log('Current employee array: ', this.employeeService.employeeArraySubject.getValue());
                return true;
            } else if (data != null) {
                console.log('Employee Array VALID');
                this.employeeService.employeeArraySubject.next(data);
                return true;
            }
        })
    }

    // Retrieve Employee array object from backend
    private fetchAllEmployees(): Observable<Employee[]> {
        return this.apiService.get<Employee[]>(EmployeeResolverService.allEmployeesPath);
    }
}
