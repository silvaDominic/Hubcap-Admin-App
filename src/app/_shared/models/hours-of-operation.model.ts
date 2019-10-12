import {HoursException} from './hours-exception.model';
import {StoreHours} from './store-hours.model';

export class HoursOfOperation {

    public static EMPTY_MODEL = <HoursOfOperation>{
        storeHours: new Array(StoreHours.EMPTY_MODEL),
        hoursExceptions: new Array(HoursException.EMPTY_MODEL)
    };

    constructor(
        public storeHours: StoreHours[],
        public hoursExceptions: HoursException[]
    ) {}
}
