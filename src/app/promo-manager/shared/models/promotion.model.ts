import {FREQUENCY_TYPE} from '../../../_shared/models/FREQUENCY_TYPE.model';
import {FREQUENCY} from '../../../_shared/models/FREQUENCY.model';
import {Discount} from './discount.model';
import {SERVICE_TYPE} from '../../../_shared/models/PACKAGE_TYPE.model';
import {WASH_PACKAGE} from '../../../_shared/models/WASH_PACKAGE.model';
import {DETAIL_PACKAGE} from '../../../_shared/models/DETAIL_PACKAGE.model';
import {SimpleTime} from '../../../_shared/models/simple-time.model';

export class Promotion {

    constructor(public id: string, public name: string, public description: string,
                public serviceType: SERVICE_TYPE, public frequencyType: FREQUENCY_TYPE,
                public frequency: FREQUENCY, public startDate: Date, public endDate: Date,
                public discountPackages: WASH_PACKAGE[] | DETAIL_PACKAGE[], public discount: Discount,
                public startTime: string, public endTime: string) {
    }
}

