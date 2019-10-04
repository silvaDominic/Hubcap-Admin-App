import {PackageItem} from './package.item.model';
import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';


export class Package {

    static readonly EMPTY_MODEL = {
        name: '',
        type: SERVICE_TYPE.WASH,
        oneTimePrices: new Map<VEHICLE_TYPE, number>().set(VEHICLE_TYPE.REGULAR, 0).set(VEHICLE_TYPE.OVERSIZED, 0),
        packageItems: new Array<PackageItem>(),
        duration: 0,
        monthlyPrices: new Map<VEHICLE_TYPE, number>().set(VEHICLE_TYPE.REGULAR, 0).set(VEHICLE_TYPE.OVERSIZED, 0),
    };

    constructor(
        public name: string,
        public type: SERVICE_TYPE,
        public oneTimePrices: Map<VEHICLE_TYPE, number>,
        public packageItems: PackageItem[],
        public duration?: number,
        public monthlyPrices?: Map<VEHICLE_TYPE, number>,
        public isUnlimitedMonthly?: boolean,
        public monthlyUses?: number) {
    }
}
