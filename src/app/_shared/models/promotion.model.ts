import {DETAIL_PACKAGE} from '../enums/DETAIL_PACKAGE.model';
import {FREQUENCY_TYPE} from '../enums/FREQUENCY_TYPE.model';
import {Discount} from './discount.model';
import {FREQUENCY} from '../enums/FREQUENCY.model';
import {WASH_PACKAGE} from '../enums/WASH_PACKAGE.model';
import {SERVICE_TYPE} from '../enums/PACKAGE_TYPE.model';


export class Promotion {

    constructor(public id: string, public name: string, public description: string,
                public serviceType: SERVICE_TYPE, public frequencyType: FREQUENCY_TYPE,
                public frequency: FREQUENCY, public startDate: Date, public endDate: Date,
                public discountPackages: WASH_PACKAGE[] | DETAIL_PACKAGE[], public discount: Discount,
                public startTime: string, public endTime: string) {
    }
}

