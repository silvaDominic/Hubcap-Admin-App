import {DisplayPackageItem} from './display-package-item.model';
import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {PackageItem} from './package-item.model';
import {Price} from './price.model';


export class Package {

    static readonly EMPTY_MODEL = <Package>{
        id: null,
        name: '',
        type: SERVICE_TYPE.WASH,
        oneTimePrices: Price.EMPTY_MODEL,
        packageItems: new Array<PackageItem>(),
        duration: null,
        monthlyPrices: Price.EMPTY_MODEL
    };

    constructor(
        public id: string,
        public name: string,
        public type: SERVICE_TYPE,
        public oneTimePrices: Price,
        public packageItems: PackageItem[],
        public duration?: number,
        public monthlyPrices?: Price) {
    }
}
