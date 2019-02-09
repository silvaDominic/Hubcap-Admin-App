export class Promo {
    public title: string;
    public frequency: string;
    public startDate: Date;
    public endDate: Date;
    public  startTime: Date;
    public endTime: Date;
    public isStandardDiscount: boolean;
    public percentDiscount: number;
    public discountAmount: number;

    constructor(title: string, frequency: string,
                startDate: Date, endDate: Date,
                startTime: Date, endTime: Date,
                isStandardDiscount: boolean,
                percentDiscount: number, discountAmount: number) {
        this.title = title;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isStandardDiscount = isStandardDiscount;
        this.percentDiscount = percentDiscount;
        this.discountAmount = discountAmount;
    }
}

