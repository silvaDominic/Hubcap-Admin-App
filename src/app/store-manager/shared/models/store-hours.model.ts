import {DAY} from '../../../_shared/models/DAY.model';

export class StoreHours {

    constructor(public day: DAY,
                public openTime: string,
                public closeTime: string) {}

    public isOpen(): boolean {
        console.log('Temporary');
        return false;
    }
}
