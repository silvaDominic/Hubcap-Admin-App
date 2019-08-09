import {Promotion} from '../../promo-manager/shared/models/promotion.model';
import {Discount} from '../../promo-manager/shared/models/discount.model';
import {DISCOUNT_TYPE} from './DISCOUNT_TYPE.model';
import {FREQUENCY_TYPE} from './FREQUENCY_TYPE.model';
import {SERVICE_TYPE} from './PACKAGE_TYPE.model';
import {WASH_PACKAGE} from './WASH_PACKAGE.model';
import {SimpleTime} from './simple-time.model';

export const CONSTANTS = {
    DEFAULT_WASH_PACKAGE: 'Gold',
    DEFAULT_DETAIL_PACKAGE: 'Exterior',
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
    NUM_YEAR: {year: 'numeric'}
};
