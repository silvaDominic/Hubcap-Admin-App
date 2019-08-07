import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '../../store-manager/shared/models/store.model';
import {Observable} from 'rxjs';
import {VEHICLE_TYPE} from '../models/VEHICLE_TYPE.model';
import {DAY} from '../models/DAY.model';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StoreHours} from '../../store-manager/shared/models/store-hours.model';
import {HoursException} from '../../store-manager/shared/models/hours-exception.model';
import {CarwashService} from './carwash.service';

@Injectable({
    providedIn: 'root'
})
export class StoresService {

    static vehicleKeys = Object.keys(VEHICLE_TYPE);
    static dayKeys = Object.keys(DAY);

    public stores: Store[];

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient,
        private readonly carwwashService: CarwashService
    ) {}

    private initAllStores() {
        // How are we switch between stores when we can see them all?k
    }

    private generateStore(data: any) {

    }

/*    fetchAllStores(): Observable<Store[]> {
        return this.http.get<Store[]>(this.storesUrl)
    }

    getStoreForm() {
        return this.fetchAllStores().pipe(
            map((apiResponse: any) => this.generateStoreForm(apiResponse)
        ));
    }*/

    public generateStoreForm(apiResponse: any): FormGroup {
        return this.fb.group({
            id: [apiResponse.id],
            name: [apiResponse.name, Validators.required],
            address: [apiResponse.address, Validators.required],
            city: [apiResponse.city, Validators.required],
            state: [apiResponse.state, Validators.required],
            zip: [apiResponse.zip, Validators.required],
            email: [apiResponse.email, [Validators.required, Validators.email]],
            phoneNumber: [apiResponse.phoneNumber, Validators.required],
            storeHours: this.fb.array(apiResponse.hoursOfOperation.map
            (storeHours => this.generateHoursForm(storeHours))),
            vehicleType: [apiResponse.vehicleType, Validators.required],
            website: [apiResponse.website]
        });
    }

    private generateHoursForm(storeHours: StoreHours): FormGroup {
        return this.fb.group({
            day: [storeHours.day, Validators.required],
            isOpen: [storeHours.isOpen(), Validators.required],
            openTime: [storeHours.openTime, Validators.required],
            closeTime: [storeHours.closeTime, Validators.required]
        });
    }

    public generateExceptionsForm(exception: HoursException): FormGroup {
        return this.fb.group({
            name: [exception.name, Validators.required],
            date: [exception.date, Validators.required],
            exceptionType: [exception.exceptionType, Validators.required],
            openTime: [exception.openTime],
            closeTime: [exception.closeTime]
        });
    }
}

