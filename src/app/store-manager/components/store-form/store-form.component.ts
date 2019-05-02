import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '../../shared/models/store.model';
import {StoresService} from '../../../shared/services/stores.service';
import {StoreHours} from '../../shared/models/store-hours.model';
import {DAY} from '../../../shared/models/DAY.model';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent {

    storeFormGroup: FormGroup;
    @Input() stores;
    @Input() storeForm;

    vehicleKeys = StoresService.vehicleKeys;
    dayKeys = StoresService.dayKeys;

    constructor(private storeService: StoresService) {
        this.storeFormGroup = this.storeService.generateStoreForm(this.initStore());
    }

    private initStore() {
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
            [],
        );
    }

    private initStoreHours(dayEnum: DAY): StoreHours {
        return new StoreHours(
            dayEnum,
            false,
            '',
            ''
        )
    }

    private addStoreHours() {
        const _this = this;
        const hours = [];
        this.dayKeys.forEach(function(day) {
            const dayEnum: DAY = DAY[day];
            hours.push(_this.initStoreHours(dayEnum));
        });
        return hours;
    }

    private initStoreExceptions() {

    }

    createStore() {
        console.log('STORE HOURS: ', this.storeFormGroup.get('storeHours').value);
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
            []
        );
        this.stores.push(newStore);
        console.log('New Store Created: ', newStore);
    }
}
