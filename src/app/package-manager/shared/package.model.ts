import {PackageItem} from './package.item.model';
import {SERVICE_TYPE} from '../../_shared/models/PACKAGE_TYPE.model';
import {VEHICLE_TYPE} from '../../_shared/models/VEHICLE_TYPE.model';

export class Package {

    constructor(    public name: string,
    public type: SERVICE_TYPE,
    public onetimePrices: Map<VEHICLE_TYPE, number>,
    public packageItems: PackageItem[],
    public duration?: number,
    public monthlyPrices?: Map<VEHICLE_TYPE, number>,
    public isUnlimitedMonthly?: boolean,
    public monthlyUses?: number) {
    }
}
