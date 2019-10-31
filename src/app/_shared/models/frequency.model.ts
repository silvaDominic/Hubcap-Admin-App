import {FREQUENCY} from '../enums/FREQUENCY.model';

export class Frequency {
    
    public static EMPTY_MODEL = <Frequency>{
        type: FREQUENCY.WEEKLY,
        value: ''
    };
    
    constructor(public type: FREQUENCY, public value: string) {}
}
