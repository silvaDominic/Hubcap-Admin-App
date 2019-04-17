import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PERMISSION_LEVEL} from '../../../shared/models/PERMISSION_LEVEL.model';
import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Role} from '../../shared/models/role.model';
import {Store} from '../../../store-manager/shared/models/store.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() stores: Store[];
  @Input() users: User[];

  userFormGroup: FormGroup;

  permissionLevel = PERMISSION_LEVEL;
  permissionKeys = UsersService.permissionKeys;
  roleMap = UsersService.roleMap;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
      this.userFormGroup = this.fb.group({
              nameCtrl: ['', Validators.required],
              emailCtrl: ['', Validators.email],
              permissionCtrl: ['', Validators.required],
              storeCtrl: [[], Validators.required]
          }
      );
  }

  ngOnInit() {
  }

    createUser() {
        const roleName = this.roleMap.get(this.userFormGroup.get('permissionCtrl').value);
        const rolePermLevel = this.userFormGroup.get('permissionCtrl').value;

        const newUser = new User(
            UsersService.generateUserId(),
            this.userFormGroup.get('nameCtrl').value,
            UsersService.generatePassword(),
            this.userFormGroup.get('emailCtrl').value,
            this.userFormGroup.get('storeCtrl').value,
            new Role(roleName, rolePermLevel),
            false,
            false
        );
        this.users.push(newUser);
        console.log('NEW USER: ', newUser);

        this.openSnackBar('User ' + newUser.name, 'Created');

/*        this.usersService.newUser(newUser)
            .subscribe(_user => this.users.push(_user));*/
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 7000,
        });
    }

}
