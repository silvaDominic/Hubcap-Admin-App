import { Component, OnInit } from '@angular/core';
import {Employee} from '../../_shared/models/employee.model';
import {Store} from '../../_shared/models/store.model';
import {EmployeeService} from '../../_shared/services/employee.service';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss']
})
export class EmployeeManagerComponent implements OnInit {
    users: Employee[];
    stores: Store[];

    error: string;

  constructor(private usersService: EmployeeService, private storesService: StoreService) { }

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
