import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '../../../../_shared/models/store.model';
import {StoreHours} from '../../../../_shared/models/store-hours.model';
import {HoursException} from '../../../../_shared/models/hours-exception.model';
import {StoreService} from '../../../../_shared/services/store.service';
import {DAY} from '../../../../_shared/enums/DAY.model';
import {Address} from '../../../../_shared/models/address.model';
import {STATES} from '../../../../_shared/enums/STATES.model';
import {CARWASH_TYPE} from '../../../../_shared/enums/CARWASH_TYPE.model';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent {

    storeForm: FormGroup;
    formExceptions: HoursException[];

    E_DAY = DAY;
    E_STATE_KEYS = Object.keys(STATES);
    E_CARWASH_TYPE_KEYS = Object.keys(CARWASH_TYPE);

    constructor(private storeService: StoreService) {
        this.storeForm = this.storeService.getForm();
        this.formExceptions = [];
    }

    createStore(storeForm: FormGroup) {
        this.storeService.createStore(storeForm);
    }
}
