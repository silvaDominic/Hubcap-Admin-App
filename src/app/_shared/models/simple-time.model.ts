export class SimpleTime {

    private _time: string;
    private _hours: string;
    private _minutes: string;
    private readonly separatorIndex: number;
    private suffix = 'AM';
    public is12Hour;


    constructor(time: string, is12Hour= false) {
        this._time = time;
        this._hours = parseInt(this._time, 10).toString();

        this.separatorIndex = this._time.indexOf(':');
        this._minutes = this._time.slice(this.separatorIndex);
    }

    private isValidTime(stringInQuestion: string): boolean {
        return !(isNaN(parseInt(stringInQuestion, 10)));
    }

    get time(): string {
        return this._time;
    }

    set time(time: string) {
        if (this.isValidTime(time)) {
            this._time = time;
        } else {
            console.log('Argument did not pass validation as a legitimate SimpleTime object');
        }
    }

    get hours(): string {
        return parseInt(this._hours, 10).toString();
    }

    set hours(hours: string) {
        if (hours.length === 0) {
            this._hours = '0' + hours;
            this.resetTime();
        }
    }

    get minutes(): string {
        return this._minutes;
    }

    set minutes(minutes: string) {
        this._minutes = this._time.substring(this.separatorIndex + 1);
        this.resetTime();
    }

    private resetTime() {
        this._time = this._hours + ':' + this._minutes;
    }

    convertTo12HoursClock(time: string){
        const hh = parseInt(this._hours, 10);
        const m = parseInt(this._minutes, 10);
        const mm = this._minutes;
        let dd = this.suffix;
        let h = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = 'PM';
        }
        if (h === 0) {
            h = 12;
        }
        if (m > 10) {
            this._minutes = m.toString();
        } else {
            this._minutes = mm.toString();
        }
        this._hours = h.toString();
        this.suffix = dd;
        this.resetTime();
    }
}
