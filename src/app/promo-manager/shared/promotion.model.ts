import {FREQUENCY_TYPE} from '../../shared/models/FREQUENCY_TYPE.model';
import {FREQUENCY} from '../../shared/models/FREQUENCY.model';
import {Discount} from './discount.model';
import {PACKAGE_TYPE} from '../../shared/models/PACKAGE_TYPE.model';
import {ALL_PACKAGES} from '../../shared/models/ALL_PACKAGES.model';

export class Promotion {

    constructor(public id: string, public name: string, public description: string,
                public frequencyType: FREQUENCY_TYPE, public frequency: FREQUENCY,
                public startDate: string, public endDate: string, public packageType: PACKAGE_TYPE,
                public discountPackages: ALL_PACKAGES[], public discount: Discount,
                public startTime: string, public endTime: string,
                public isAllDay: boolean, public isActive: boolean) {
    }
}

