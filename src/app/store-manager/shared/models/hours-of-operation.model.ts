import {HoursException} from './hours-exception.model';
import {StoreHours} from './store-hours.model';

export class HoursOfOperation {
    constructor(public storeHours: StoreHours[],
                public hoursExceptions: HoursException[]) {}
}
