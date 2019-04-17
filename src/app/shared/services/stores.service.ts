import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '../../store-manager/shared/models/store.model';
import {Observable} from 'rxjs';
import {VEHICLE_TYPE} from '../models/VEHICLE_TYPE.model';
import {DAYS} from '../models/DAY.model';

@Injectable({
    providedIn: 'root'
})
export class StoresService {

    static vehicleKeys = Object.keys(VEHICLE_TYPE);
    static dayKeys = Object.keys(DAYS);

    private storesUrl = 'http://localhost:4200/assets/data/stores.json';
    private exceptionsUrl = 'http://localhost:4200/assets/data/exceptions.json';

    static generateStoreId() {
        return '#' + Math.random().toString(); // Will be made more comprehensive in the future
    }

    static generateExceptionId() {
        return '#' + Math.random().toString(); // Will be made more comprehensive in the future
    }

    constructor(private http: HttpClient) {}

    fetchAllStores(): Observable<Store[]> {
        return this.http.get<Store[]>(this.storesUrl)
    }
}
