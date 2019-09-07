import {DISCOUNT_TYPE} from './enums/DISCOUNT_TYPE.model';
import {FREQUENCY_TYPE} from './enums/FREQUENCY_TYPE.model';
import {SERVICE_TYPE} from './enums/SERVICE_TYPE';
import {WASH_PACKAGE} from './enums/WASH_PACKAGE.model';
import {Discount} from './models/discount.model';
import {Promotion} from './models/promotion.model';

export const CONSTANTS = {
    PACKAGE_ITEMS_URL: 'http://localhost:4200/assets/data/all-package-items.json',
    PROMOTION_TEMPLATE: new Promotion(
        '00',
        '[NAME]',
        '[DESCRIPTION]',
        SERVICE_TYPE.WASH,
        FREQUENCY_TYPE.ONE_TIME,
        null,
        new Date('2019-01-01T05:00:00.000Z'),
        new Date('2019-01-08T05:00:00.000Z'),
        [
            WASH_PACKAGE.SILVER,
            WASH_PACKAGE.GOLD,
            WASH_PACKAGE.PLATINUM],
        new Discount(DISCOUNT_TYPE.PERCENT,
            99,
            []),
            '09:00',
            '17:00'
    ),
    SHORT_WEEKDAY: {weekday: 'short'},
    SHORT_MONTH: {month: 'short'},
    NUM_YEAR: {year: 'numeric'},
    WASH_ICONS_REF: ['iconA-wash-bronze.svg', 'iconA-wash-silver.svg', 'iconA-wash-gold.svg'],
    DETAIL_ICONS_REF: ['iconA-detail-interior.svg', 'iconA-detail-exterior.svg', 'iconA-detail-both.svg']
};
