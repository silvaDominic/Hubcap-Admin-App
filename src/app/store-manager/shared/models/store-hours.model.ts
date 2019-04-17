import {DAYS} from '../../../shared/models/DAY.model';

export class StoreHours {

    constructor(public day: DAYS,
                public isOpen: boolean,
                public openTime: string,
                public closeTime: string) {}
}
