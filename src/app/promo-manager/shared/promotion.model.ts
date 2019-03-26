import {FREQUENCY_TYPE} from './FREQUENCY_TYPE.model';
import {FREQUENCY} from './FREQUENCY.model';
import {Discount} from './discount.model';

export class Promotion {

    constructor();
    constructor(public id?: string, public name?: string, public description?: string,
                public frequencyType?: FREQUENCY_TYPE, public frequency?: FREQUENCY,
                public startDate?: string, public endDate?: string,
                public discountPackages?: boolean[], public discount?: Discount,
                public startTime?: string, public endTime?: string,
                public isAllDay?: boolean, public isActive?: boolean) {

        this.reset();
    }

    public reset() {
        this.name = '';
        this.description = '';
        this.frequencyType = FREQUENCY_TYPE.ONE_TIME;
        this.frequency = null;
        this.startDate = '';
        this.endDate = '';
        this.discountPackages = new Array<boolean>();
        this.discount = new Discount();
        this.startTime = '';
        this.endTime = '';
        this.isAllDay = false;
        this.isActive = true;
    }
}

