import {Component} from '@angular/core';
import {EmployeeService} from '../../../../_shared/services/employee.service';
import {ROLE} from '../../../../_shared/enums/ROLE';
import {FormGroup} from '@angular/forms';
import {Utilities} from '../../../../_shared/utilities';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
    employeeCode: string;
    codeGenerated: boolean = false;
    employeeRoleForm: FormGroup;
    E_ROLE_KEYS = Object.keys(ROLE);

    constructor(private readonly employeeService: EmployeeService) {
        this.employeeRoleForm = this.employeeService.generateRoleForm();
    }

    public createEmployee(employeeRoleForm: FormGroup): void {
        // Comment this out to test real API call
        return this.fakeResponse();

        if (employeeRoleForm.valid) {
            this.employeeService.createEmployee(employeeRoleForm).then(result => {
                this.employeeService.openSnackBar('Employee Code', 'GENERATED');
                this.employeeCode = result;
                this.codeGenerated = true;
                console.log('Code Generated');
            }).catch(reason => {
                alert('Error generating code. Please try again or contact your Admin.');
                console.warn(reason);
            });
        } else if (!employeeRoleForm.valid) {
            alert(
                'Please select the new employee\'s role.'
            );
        }
    }

    private fakeResponse(): void {
        this.employeeCode = (Math.floor(Math.pow(Math.random() * 10, 6))).toString();
        this.codeGenerated = true;
        console.log('Code Generated');
    }

    private resetForm(): void {
        this.employeeRoleForm.reset();
        this.employeeCode = null;
        this.codeGenerated = false;
    }
}
