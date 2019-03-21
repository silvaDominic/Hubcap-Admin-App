import { PACKAGE } from './PACKAGE.model';
import { FREQUENCY_TYPE } from './FREQUENCY_TYPE.model';
import { FREQUENCY } from './FREQUENCY.model';
import { Discount } from './discount.model';

export class Promotion {
    public id: string;
    public name: string;
    public description: string;
    public frequencyType: FREQUENCY_TYPE;
    public frequency: FREQUENCY;
    public startDate: string;
    public endDate: string;
    public discountPackages: boolean[];
    public discount: Discount;
    public startTime: string;
    public endTime: string;
    public isAllDay: boolean;
    public isActive: boolean;

    constructor(id: string, name: string, description: string,
                frequencyType: FREQUENCY_TYPE, frequency: FREQUENCY,
                startDate: string, endDate: string,
                discountPackages: boolean[], discount: Discount,
                startTime: string, endTime: string,
                isAllDay: boolean, isActive: boolean) {
        this.name = name;
        this.description = description;
        this.frequencyType = frequencyType;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.discountPackages = discountPackages;
        this.discount = discount;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAllDay = isAllDay;
        this.isActive = isActive;
    }
}

