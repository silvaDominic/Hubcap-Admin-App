import {VEHICLE_TYPE} from '../../../shared/models/VEHICLE_TYPE.model';
import {StoreHours} from './store-hours.model';
import {Exception} from './exception.model';

export class Store {

    constructor(public id: string,
                public name: string,
                public address: string,
                public city: string,
                public state: string,
                public zip: number,
                public email: string,
                public phoneNumber: number,
                public storeHours: StoreHours[],
                public vehicleTypes: VEHICLE_TYPE[],
                public website?: string,
                public exceptions ?: Exception[]) {}
}
