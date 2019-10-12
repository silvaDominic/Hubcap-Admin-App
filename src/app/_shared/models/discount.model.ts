import {PackageItem} from './package.item.model';
import {DISCOUNT_TYPE} from '../enums/DISCOUNT_TYPE.model';

export class Discount {

    public static EMPTY_MODEL = <Discount>{
        discountType: null,
        discountAmount: null,
        discountFeatures: []
    };

    constructor(public discountType: DISCOUNT_TYPE,
                public discountAmount: number,
                public discountFeatures: PackageItem[]) {
    }
}
