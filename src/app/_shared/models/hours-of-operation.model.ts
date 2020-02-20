import {HoursException} from './hours-exception.model';
import {StoreHours} from './store-hours.model';
import {DAY} from '../enums/DAY.model';

export class HoursOfOperation {

    private static storeHours = [
        new StoreHours(DAY.MONDAY),
        new StoreHours(DAY.TUESDAY),
        new StoreHours(DAY.WEDNESDAY),
        new StoreHours(DAY.THURSDAY),
        new StoreHours(DAY.FRIDAY),
        new StoreHours(DAY.SATURDAY),
        new StoreHours(DAY.SUNDAY),
    ];

    public static EMPTY_MODEL = <HoursOfOperation> {
        storeHours: HoursOfOperation.storeHours,
        hoursExceptions: new Array<HoursException>()
    };

    constructor(
        public storeHours: StoreHours[],
        public hoursExceptions: HoursException[]
    ) {}

    private addStoreHours() {
        const hours = [];
        Object.keys(DAY).forEach(function (day) {
            const dayEnum: DAY = DAY[day];
            hours.push(new StoreHours(dayEnum));
        });
        console.log('Form Store Hours: ', hours);
        return hours;
    }

}
