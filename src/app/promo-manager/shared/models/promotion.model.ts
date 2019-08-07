import {FREQUENCY_TYPE} from '../../../_shared/models/FREQUENCY_TYPE.model';
import {FREQUENCY} from '../../../_shared/models/FREQUENCY.model';
import {Discount} from './discount.model';
import {SERVICE_TYPE} from '../../../_shared/models/PACKAGE_TYPE.model';
import {ALL_PACKAGES} from '../../../_shared/models/ALL_PACKAGES.model';

export class Promotion {

    constructor(public id: string, public name: string, public description: string,
                public serviceType: SERVICE_TYPE, public frequencyType: FREQUENCY_TYPE,
                public frequency: FREQUENCY, public startDate: string, public endDate: string,
                public discountPackages: Map<ALL_PACKAGES, boolean>, public discount: Discount,
                public startTime: string, public endTime: string,
                public isAllDay: boolean, public isActive: boolean) {
    }

    // Implement this
    public formatTime(time: string) {

    }
}

