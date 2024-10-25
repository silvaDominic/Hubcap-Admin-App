import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../_shared/services/employee.service';
import {StoreService} from '../../_shared/services/store.service';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.scss']
})
export class EmployeeManagerComponent implements OnInit {
    error: string;

  constructor(public readonly employeeService: EmployeeService, private storesService: StoreService) { }

    ngOnInit() {

    }
}
