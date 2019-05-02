import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '../../store-manager/shared/models/store.model';
import {Observable} from 'rxjs';
import {VEHICLE_TYPE} from '../models/VEHICLE_TYPE.model';
import {DAY} from '../models/DAY.model';
import {map} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';
import {StoreHours} from '../../store-manager/shared/models/store-hours.model';
import {Exception} from '../../store-manager/shared/models/exception.model';

@Injectable({
    providedIn: 'root'
})
export class StoresService {

    static vehicleKeys = Object.keys(VEHICLE_TYPE);
    static dayKeys = Object.keys(DAY);

    private storesUrl = 'http://localhost:4200/assets/data/stores.json';
    private exceptionsUrl = 'http://localhost:4200/assets/data/exceptions.json';

    static generateStoreId() {
        return '#' + Math.random().toString(); // Will be made more comprehensive in the future
    }

    static generateExceptionId() {
        return '#' + Math.random().toString(); // Will be made more comprehensive in the future
    }

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient
    ) {
    }

    fetchAllStores(): Observable<Store[]> {
        return this.http.get<Store[]>(this.storesUrl)
    }

    getStoreForm() {
        return this.fetchAllStores().pipe(
            map((apiResponse: any) => this.generateStoreForm(apiResponse)
        ));
    }

    public generateStoreForm(apiResponse: any) {
        return this.fb.group({
            id: [apiResponse.id],
            name: [apiResponse.name, Validators.required],
            address: [apiResponse.address, Validators.required],
            city: [apiResponse.city, Validators.required],
            state: [apiResponse.state, Validators.required],
            zip: [apiResponse.zip, Validators.required],
            email: [apiResponse.email, Validators.required, Validators.email],
            phoneNumber: [apiResponse.phoneNumber, Validators.required],
            storeHours: this.fb.array(apiResponse.storeHours.map
            (storeHours => this.generateHoursForm(storeHours))),
            vehicleType: [apiResponse.vehicleType, Validators.required],
            website: [apiResponse.website],
            exceptions: this.fb.array(apiResponse.exceptions.map
            (exception => this.generateExceptionsForm(exception)))
        });
    }

    private generateHoursForm(storeHours: StoreHours) {
        return this.fb.group({
            day: [storeHours.day, Validators.required],
            isOpen: [storeHours.isOpen, Validators.required],
            openTime: [storeHours.openTime, Validators.required],
            closeTime: [storeHours.closeTime, Validators.required]
        });
    }

    private generateExceptionsForm(exception: Exception) {
        return this.fb.group({
            id: [exception.id],
            name: [exception.name, Validators.required],
            exceptionType: [exception.exceptionType, Validators.required],
            openTime: [exception.openTime],
            closeTime: [exception.closeTime]
        });
    }
}

