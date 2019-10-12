import {CARWASH_TYPE} from '../enums/CARWASH_TYPE.model';
import {Rating} from './rating.model';
import {Address} from './address.model';
import {CarwashCoordinates} from './carwash-coordinates.model';
import {Package} from './package.model';
import {Promotion} from './promotion.model';
import {HoursOfOperation} from './hours-of-operation.model';
import {Store} from './store.model';

export class Carwash {

    constructor(
        public metaData: Store,
        public promotions: Promotion[],
        public washPackages: Package[],
        public detailPackages: Package[]
    ) {}
}
