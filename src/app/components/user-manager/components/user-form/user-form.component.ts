import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {User} from '../../../../_shared/models/user.model';
import {Role} from '../../../../_shared/models/role.model';
import {Store} from '../../../../_shared/models/store.model';
import {MatSnackBar} from '@angular/material';
import {UsersService} from '../../../../_shared/services/users.service';
import {ROLE} from '../../../../_shared/enums/ROLE';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    @Input() stores: Store[];
    @Input() users: User[];

    userFormGroup: FormGroup;

    permissionLevel = ROLE;
    permissionKeys = UsersService.permissionKeys;
    roleMap = UsersService.roleMap;

    static initUserForm(): User {
        return new User(
            '',
            '',
            '',
            '',
            '',
            '',
            [],
            new Role('', null),
            false,
            false
        );
    }

  constructor(userService: UsersService, private snackBar: MatSnackBar) {
      this.userFormGroup = userService.generateUserForm(UserFormComponent.initUserForm());
  }

  ngOnInit() {
  }

    createUser() {
        const roleName = this.roleMap.get(this.userFormGroup.get('permissionLevel').value);
        const rolePermLevel = this.userFormGroup.get('permissionLevel').value;

        const newUser = new User(
            UsersService.generateUserId(),
            this.userFormGroup.get('firstName').value,
            this.userFormGroup.get('lastName').value,
            UsersService.generatePassword(),
            this.userFormGroup.get('email').value,
            this.userFormGroup.get('phoneNumber').value,
            this.userFormGroup.get('storeIds').value,
            new Role(roleName, rolePermLevel),
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
