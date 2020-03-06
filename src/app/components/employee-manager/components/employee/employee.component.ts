import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../../../../_shared/models/employee.model';
import {EmployeeService} from '../../../../_shared/services/employee.service';
import {ROLE} from '../../../../_shared/enums/ROLE';
import {FormGroup} from '@angular/forms';
import {Utilities} from '../../../../_shared/utilities';
import {tap} from 'rxjs/operators';
import {DialogBoxService} from '../../../../_shared/services/dialog-box.service';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

    @Input() thisEmployee: Employee;

    E_ROLE = ROLE;
    E_ROLE_KEYS = Object.keys(ROLE);

    employeeForm: FormGroup;

    constructor(private readonly employeeService: EmployeeService, private dialogBoxService: DialogBoxService) {

    }

    ngOnInit() {
        this.employeeForm = this.employeeService.getFormById(this.thisEmployee.id)
    }

    updateEmployee(employeeForm: FormGroup, id: string) {
        if (this.employeeForm.valid) {
            this.employeeService.updateEmployee(this.employeeForm, this.thisEmployee.id).then(result => {
                if (result == true) {
                    this.employeeService.openSnackBar('Employee: ' + this.employeeForm.get('firstName').value + ' ' + this.employeeForm.get('lastName').value, 'UPDATED');
                    // Otherwise, display alert
                } else {
                    alert('Error UPDATING ' + this.employeeForm.get('firstName').value + ' ' + this.employeeForm.get('lastName').value + '.' + ' Try again or contact your Admin.');
                }
            });
        } else if (!this.employeeForm.valid) {
            alert(
                'Please fill out the remaining fields \n' +

                Utilities.findInvalidControls(this.employeeForm).map(
                    control => {
                        return control.toString() + '\n'
                    }
                )
            );
        }
    }

    deleteEmployee(id: string) {
        this.dialogBoxService.openDialogBox('Delete Employee', 'Are you sure you want to perform this action?')
            .afterClosed().subscribe(
            res => {
                if (res === true) {
                    this.employeeService.deleteEmployee(id).then(() => {
                        this.employeeService.openSnackBar('Employee: ' + this.thisEmployee.firstName + ' ' + this.thisEmployee.lastName, 'DELETED');
                    }).catch((reason => {
                        alert('Error DELETING Employee: ' + this.thisEmployee.firstName + ' ' + this.thisEmployee.lastName);
                    }))
                }
            });
    }
}
