import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Employee} from '../../../../_shared/models/employee.model';
import {Role} from '../../../../_shared/models/role.model';
import {Store} from '../../../../_shared/models/store.model';
import {MatSnackBar} from '@angular/material';
import {EmployeeService} from '../../../../_shared/services/employee.service';
import {ROLE} from '../../../../_shared/enums/ROLE';

@Component({
    selector: 'app-user-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
    @Input() stores: Store[];
    @Input() users: Employee[];

    userFormGroup: FormGroup;

    E_ROLE_KEYS = Object.keys(ROLE);

    static initUserForm(): Employee {
        return new Employee(
            '',
            '',
            '',
            '',
            '',
            '',
            [],
            null,
            false,
            false
        );
    }

  constructor(userService: EmployeeService, private snackBar: MatSnackBar) {
      this.userFormGroup = userService.generateUserForm(EmployeeFormComponent.initUserForm());
  }

  ngOnInit() {
  }

    createUser() {
        const newUser = new Employee(
            EmployeeService.generateUserId(),
            this.userFormGroup.get('firstName').value,
            this.userFormGroup.get('lastName').value,
            EmployeeService.generatePassword(),
            this.userFormGroup.get('email').value,
            this.userFormGroup.get('phoneNumber').value,
            this.userFormGroup.get('storeIds').value,
            this.userFormGroup.get('role').value,
            false,
            false
        );
        this.users.push(newUser);

        this.openSnackBar('User ' + newUser.firstName + ' ' + newUser.lastName, 'Created');

    /*        this.usersService.newUser(newUser)
            .subscribe(_user => this.users.push(_user));*/
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 7000,
        });
    }

}
