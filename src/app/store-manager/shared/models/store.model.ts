import {VEHICLE_TYPE} from '../../../shared/models/VEHICLE_TYPE.model';
import {StoreHours} from './store-hours.model';
import {Exception} from './exception.model';

export class Store {

    constructor(public id: string,
                public name: string,
                public address: string,
                public city: string,
                public state: string,
                public zip: string,
                public email: string,
                public phoneNumber: string,
                public storeHours: StoreHours[],
                public vehicleTypes: VEHICLE_TYPE[],
                public website?: string,
                public exceptions ?: Exception[]) {}
}
