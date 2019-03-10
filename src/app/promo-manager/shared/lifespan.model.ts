import {Input} from '@angular/core';

export class LifeSpan {

    private dateFrom: Date;
    private dateTo: Date;
    private timeFrom: Date;
    private timeTo: Date;

    constructor(timeFrom: Date, timeTo: Date, dateFrom: Date, dateTo: Date) {
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
}