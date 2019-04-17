import {Component, Input, OnInit} from '@angular/core';
import {Store} from '../../../store-manager/shared/models/store.model';
import {Role} from '../../shared/models/role.model';
import {PERMISSION_LEVEL} from '../../../shared/models/PERMISSION_LEVEL.model';
import {UsersService} from '../../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @Input() stores: Store[];
    @Input() thisUser: User;

    permissionLevel = PERMISSION_LEVEL;
    permissionKeys = UsersService.permissionKeys;
    roleMap = UsersService.roleMap;

    // panelOpenState = false;

    constructor() {

    }

    ngOnInit() {
    }

    updateUser(user: User) {}

    deleteUser(user: User) {}
}
