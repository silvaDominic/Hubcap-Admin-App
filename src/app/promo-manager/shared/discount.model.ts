import {DISCOUNT_TYPE} from './DISCOUNT_TYPE.model';
import {PackageItem} from '../../package-manager/shared/package.item.model';

export class Discount {

    constructor(public discountType: DISCOUNT_TYPE = DISCOUNT_TYPE.PERCENT,
                public discountAmount: number = null,
                public freeFeature: PackageItem = null) {
    }
}
