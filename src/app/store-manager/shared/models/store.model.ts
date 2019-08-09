import {VEHICLE_TYPE} from '../../../_shared/models/VEHICLE_TYPE.model';
import {StoreHours} from './store-hours.model';
import {HoursException} from './hours-exception.model';

export class Store {

    constructor(public id: string,
                public name: string,
                public city: string,
                public state: string,
                public street: string,
                public zipcode: string,
                public phoneNumber: string,
                public storeHours: StoreHours[],
                public exceptions ?: HoursException[],
                public website?: string) {}
}
