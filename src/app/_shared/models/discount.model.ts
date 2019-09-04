import {PackageItem} from './package.item.model';
import {DISCOUNT_TYPE} from '../enums/DISCOUNT_TYPE.model';

export class Discount {

    constructor(public discountType: DISCOUNT_TYPE = DISCOUNT_TYPE.PERCENT,
                public discountAmount: number = null,
                public discountFeatures: PackageItem[] = []) {
    }
}
