import {CARWASH_TYPE} from './CARWASH_TYPE.model';
import {Rating} from './rating.model';
import {Address} from './address.model';

export class CarwashMini {
    constructor(public name: string,
                public type: CARWASH_TYPE,
                public ratings: Rating[],
                public address: Address) {
    }
}
