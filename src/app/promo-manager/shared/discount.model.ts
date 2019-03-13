import {DISCOUNT_TYPE} from './DISCOUNT_TYPE.model';
import {PackageItem} from '../../package-manager/shared/package.item.model';

export class Discount {
    discountType: DISCOUNT_TYPE;
    discountAmount: number;
    freeFeature: PackageItem;

    constructor(discountType: DISCOUNT_TYPE, discountAmount: number, freeFeature: PackageItem) {
        this.discountType = discountType;
        this.discountAmount = discountAmount;
        this.freeFeature = freeFeature;
    }
}
