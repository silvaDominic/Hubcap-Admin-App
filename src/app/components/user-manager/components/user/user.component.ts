import {Component, Input, OnInit} from '@angular/core';
import {Store} from '../../../../_shared/models/store.model';
import {User} from '../../../../_shared/models/user.model';
import {UsersService} from '../../../../_shared/services/users.service';
import {ROLE} from '../../../../_shared/enums/ROLE';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @Input() stores: Store[];
    @Input() thisUser: User;

    permissionLevel = ROLE;
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
