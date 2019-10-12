import {DAY} from '../enums/DAY.model';

export class StoreHours {

    public static EMPTY_MODEL = {
        day: null,
        openTime: '',
        closeTime: ''
    };

    constructor(public day: DAY,
                public openTime: string = '',
                public closeTime: string = '') {}

    public isOpen(): boolean {
        console.log('Temporary');
        return false;
    }
}
