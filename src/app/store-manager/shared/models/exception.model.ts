import {HOURS_EXCEPTION_TYPE} from '../../../shared/models/HOURS_EXCEPTION_TYPE.model';

export class Exception {

    constructor(public id: string,
                public name: string,
                public date: string,
                public exceptionType: HOURS_EXCEPTION_TYPE,
                public openTime?: string,
                public closeTime?: string) {}
}
