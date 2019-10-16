import {FREQUENCY_TYPE} from '../enums/FREQUENCY_TYPE.model';
import {Discount} from './discount.model';
import {FREQUENCY} from '../enums/FREQUENCY.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';


export class Promotion {

    public static EMPTY_MODEL = <Promotion>{
        id: '',
        name: '',
        description: '',
        serviceType: null,
        frequencyType: null,
        frequency: null,
        startDate: new Date(),
        endDate: new Date(),
        discountPackages: [],
        discount: Discount.EMPTY_MODEL,
        startTime: '',
        endTime: '',
        isActive: false
    };

    constructor(public id: string, public name: string, public description: string,
                public serviceType: SERVICE_TYPE, public frequencyType: FREQUENCY_TYPE,
                public frequency: FREQUENCY, public startDate: Date, public endDate: Date,
                public discountPackages: string[], public discount: Discount,
                public startTime: string, public endTime: string, public isActive: boolean) {
    }
}
