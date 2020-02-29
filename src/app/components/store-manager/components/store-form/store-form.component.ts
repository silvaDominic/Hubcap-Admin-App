import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HoursException} from '../../../../_shared/models/hours-exception.model';
import {StoreService} from '../../../../_shared/services/store.service';
import {DAY} from '../../../../_shared/enums/DAY.model';
import {STATES} from '../../../../_shared/enums/STATES.model';
import {CARWASH_TYPE} from '../../../../_shared/enums/CARWASH_TYPE.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Utilities} from '../../../../_shared/utilities';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent {

    storeForm: FormGroup;
    formExceptions: HoursException[];

    E_DAY_KEYS = Object.keys(DAY);
    E_STATE_KEYS = Object.keys(STATES);
    E_CARWASH_TYPE_KEYS = Object.keys(CARWASH_TYPE);

    constructor(private readonly storeService: StoreService, private readonly snackBar: MatSnackBar) {
        this.storeForm = this.storeService.getForm();
        console.log(this.storeForm);
        this.formExceptions = [];
    }

    public createStore(storeForm: FormGroup): void {
        if (storeForm.valid) {
            this.storeService.createStore(storeForm).then((response) => {
                if (response == true) {
                    this.openSnackBar(this.storeForm.get('name').value, 'Created')
                } else {
                    alert('Error CREATING ' + this.storeForm.get('name').value + '.' + ' Try again or contact your Admin.')
                }
            });
        } else {
            alert(
                'Please fill out the remaining fields \n' +

                Utilities.findInvalidControls(this.storeForm).map(
                    control => {
                        return control.toString() + '\n'
                    }
                )
            );
        }
    }

    public updateStore(storeForm: FormGroup): void {
        if (storeForm.valid) {
            this.storeService.updateStore(storeForm).then((response) => {
                if (response == true) {
                    this.openSnackBar(this.storeForm.get('name').value, 'Created')
                } else {
                    alert('Error UPDATING ' + this.storeForm.get('name').value + '.' + ' Try again or contact your Admin.')
                }
            });
        } else {
            alert(
                'Please fill out the remaining fields \n' +

                Utilities.findInvalidControls(this.storeForm).map(
                    control => {
                        return control.toString() + '\n'
                    }
                )
            );
        }
    }

    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
