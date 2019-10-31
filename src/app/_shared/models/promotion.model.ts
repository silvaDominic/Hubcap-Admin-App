import {Discount} from './discount.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {Frequency} from './frequency.model';

export class Promotion {

    public static EMPTY_MODEL = <Promotion>{
        id: '',
        name: '',
        description: '',
        serviceType: null,
        isReoccurring: false,
        frequency: Frequency.EMPTY_MODEL,
        startDate: new Date(),
        endDate: new Date(),
        discountPackages: [],
        discount: Discount.EMPTY_MODEL,
        startTime: '',
        endTime: '',
        isActive: false
    };

    constructor(public id: string, public name: string, public description: string,
                public serviceType: SERVICE_TYPE, public isReoccurring: boolean,
                public frequency: Frequency, public startDate: Date, public endDate: Date,
                public discountPackages: string[], public discount: Discount,
                public startTime: string, public endTime: string, public isActive: boolean) {
    }
}
