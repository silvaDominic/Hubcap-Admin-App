import {Component, Input, OnInit} from '@angular/core';
import {Store} from '../../../store-manager/shared/models/store.model';
import {User} from '../../../../_shared/models/user.model';
import {UsersService} from '../../../../_shared/services/users.service';
import {PERMISSION_LEVEL} from '../../../../_shared/enums/PERMISSION_LEVEL.model';

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
