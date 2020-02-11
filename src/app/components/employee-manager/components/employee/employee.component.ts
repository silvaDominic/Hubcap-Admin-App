import {Component, Input, OnInit} from '@angular/core';
import {Store} from '../../../../_shared/models/store.model';
import {Employee} from '../../../../_shared/models/employee.model';
import {EmployeeService} from '../../../../_shared/services/employee.service';
import {ROLE} from '../../../../_shared/enums/ROLE';

@Component({
  selector: 'app-user',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
    @Input() stores: Store[];
    @Input() thisUser: Employee;

    permissionLevel = ROLE;
    permissionKeys = EmployeeService.permissionKeys;
    roleMap = EmployeeService.roleMap;

    // panelOpenState = false;

    constructor() {

    }

    ngOnInit() {
    }

    updateUser(user: Employee) {}

    deleteUser(user: Employee) {}
}
