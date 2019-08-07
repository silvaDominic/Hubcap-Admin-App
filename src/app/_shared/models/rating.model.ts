export class Rating {
    constructor(public customerName: string,
                public score: number,
                public review: string,
                private _date: Date) {}

    get date(): Date {
        return this._date;
    }

    set date(value: Date) {
        this._date = value;
    }
}
