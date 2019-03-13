import { PACKAGE } from './PACKAGE.model';
import { FREQUENCY } from './FREQUENCY.model';
import {Discount} from './discount.model';

export class Promotion {
    public id: string;
    public name: string;
    public description: string;
    public frequency: FREQUENCY;
    public startDate: string;
    public endDate: string;
    public discountPackage: PACKAGE;
    public discount: Discount;
    public startTime: string;
    public endTime: string;
    public isAllDay: boolean;

    constructor(id: string, name: string,
                description: string, frequency: FREQUENCY,
                startDate: string, endDate: string,
                discountPackage: PACKAGE, discount: Discount,
                startTime: string, endTime: string,
                isAllDay: boolean) {
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.discountPackage = discountPackage;
        this.discount = discount;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAllDay = isAllDay;
    }
}

