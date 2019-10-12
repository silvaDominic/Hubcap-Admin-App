import {HOURS_EXCEPTION_TYPE} from '../enums/HOURS_EXCEPTION_TYPE.model';

export class HoursException {

    public static EMPTY_MODEL = <HoursException>{
        name: '',
        date: '',
        exceptionType: null,
        openTime: '',
        closeTime: ''
    };

    constructor(public name: string,
                public date: string,
                public exceptionType: HOURS_EXCEPTION_TYPE,
                public openTime?: string,
                public closeTime?: string) {}
}
