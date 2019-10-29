import {DisplayPackageItem} from './display-package-item.model';
import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {PackageItem} from './package-item.model';


export class Package {

    static readonly EMPTY_MODEL = <Package>{
        id: null,
        name: '',
        type: SERVICE_TYPE.WASH,
        oneTimePrices: new Map<VEHICLE_TYPE, number>().set(VEHICLE_TYPE.REGULAR, null).set(VEHICLE_TYPE.OVERSIZED, null),
        packageItems: new Array<PackageItem>(),
        duration: null,
        monthlyPrices: new Map<VEHICLE_TYPE, number>().set(VEHICLE_TYPE.REGULAR, null).set(VEHICLE_TYPE.OVERSIZED, null)
    };

    constructor(
        public id: string,
        public name: string,
        public type: SERVICE_TYPE,
        public oneTimePrices: Map<VEHICLE_TYPE, number>,
        public packageItems: PackageItem[],
        public duration?: number,
        public monthlyPrices?: Map<VEHICLE_TYPE, number>) {
    }

    public isMonthly(): boolean {
        return this.monthlyPrices[VEHICLE_TYPE.REGULAR] !== null;
    }
}
