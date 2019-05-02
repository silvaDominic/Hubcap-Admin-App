import {DAY} from '../../../shared/models/DAY.model';

export class StoreHours {

    constructor(public day: DAY,
                public isOpen: boolean,
                public openTime: string,
                public closeTime: string) {}
}
