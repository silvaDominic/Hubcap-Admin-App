import {HoursOfOperation} from './hours-of-operation.model';
import {Address} from './address.model';
import {Rating} from './rating.model';
import {CarwashCoordinates} from './carwash-coordinates.model';
import {CARWASH_TYPE} from '../enums/CARWASH_TYPE.model';

export class Store {

    public static EMPTY_MODEL = <Store>{
        id: null,
        name: '',
        type: null,
        address: Address.EMPTY_MODEL,
        phoneNumber: '',
        coordinates: new Map<string, string>().set('lat', null).set('lng', null),
        hoursOfOperation: HoursOfOperation.EMPTY_MODEL,
        email: '',
        website: '',
        ratings: new Array(Rating.EMPTY_MODEL)
    };

    constructor(public id: string,
                public name: string,
                public type: CARWASH_TYPE,
                public address: Address,
                public phoneNumber: string,
                public coordinates: Map<string, string>,
                public hoursOfOperation: HoursOfOperation,
                public email: string,
                public website: string,
                public ratings: Rating[]) {}
}
