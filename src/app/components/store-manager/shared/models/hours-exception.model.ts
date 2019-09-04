import {HOURS_EXCEPTION_TYPE} from '../../../../_shared/enums/HOURS_EXCEPTION_TYPE.model';

export class HoursException {

    constructor(public name: string,
                public date: string,
                public exceptionType: HOURS_EXCEPTION_TYPE,
                public openTime?: string,
                public closeTime?: string) {}
}
