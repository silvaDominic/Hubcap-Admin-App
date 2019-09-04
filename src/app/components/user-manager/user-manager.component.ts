import { Component, OnInit } from '@angular/core';
import {User} from '../../_shared/models/user.model';
import {Store} from '../store-manager/shared/models/store.model';
import {UsersService} from '../../_shared/services/users.service';
import {StoresService} from '../../_shared/services/stores.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
    users: User[];
    stores: Store[];

    error: string;

  constructor(private usersService: UsersService, private storesService: StoresService) { }

    ngOnInit() {
        this.getAllUsers()
            .subscribe(users => this.users = users,
                error => this.error = error);
/*        this.getAllStores()
            .subscribe(stores => this.stores = stores,
                error => this.error = error);*/
    }

    getAllUsers() {
        return this.usersService.fetchAllUsers();
    }

/*    getAllStores() {
        return this.storesService.fetchAllStores();
    }*/

}
