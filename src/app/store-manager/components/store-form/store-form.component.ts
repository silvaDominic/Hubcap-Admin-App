import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '../../shared/models/store.model';
import {StoresService} from '../../../shared/services/stores.service';
import {StoreHours} from '../../shared/models/store-hours.model';
import {DAY} from '../../../shared/models/DAY.model';
import {Exception} from '../../shared/models/exception.model';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent {

    @Input() stores: Store[];
    @Input() storeForm: FormGroup;
    storeFormGroup: FormGroup;
    formExceptions: Exception[];

    vehicleKeys = StoresService.vehicleKeys;
    dayKeys = StoresService.dayKeys;

    private static initStoreHours(dayEnum: DAY): StoreHours {
        return new StoreHours(
            dayEnum,
            false,
            '',
            ''
        )
    }

    constructor(private storeService: StoresService) {
        this.storeFormGroup = this.storeService.generateStoreForm(this.initStore());
        this.formExceptions = [];
    }

    private initStore(): Store {
        return new Store(
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            this.addStoreHours(),
            [],
            '',
            []
        );
    }

    private addStoreHours() {
        const hours = [];
        this.dayKeys.forEach(function(day) {
            const dayEnum: DAY = DAY[day];
            hours.push(StoreFormComponent.initStoreHours(dayEnum));
        });
        return hours;
    }

    createStore() {
        const newStore = new Store(
            StoresService.generateStoreId(),
            this.storeFormGroup.get('name').value,
            this.storeFormGroup.get('address').value,
            this.storeFormGroup.get('city').value,
            this.storeFormGroup.get('state').value,
            this.storeFormGroup.get('zip').value,
            this.storeFormGroup.get('email').value,
            this.storeFormGroup.get('phoneNumber').value,
            this.storeFormGroup.get('storeHours').value,
            this.storeFormGroup.get('vehicleType').value,
            this.storeFormGroup.get('website').value,
            this.formExceptions
        );
        this.stores.push(newStore);
        this.storeFormGroup.reset();
        console.log('New Store Created: ', newStore);
    }
}
