import {Promotion} from './models/promotion.model';
import {Frequency} from './models/frequency.model';
import {Discount} from './models/discount.model';

export const CONSTANTS = {
    SHORT_WEEKDAY: {weekday: 'short'},
    SHORT_MONTH: {month: 'short'},
    NUM_DAY: {day: 'numeric'},
    NUM_YEAR: {year: 'numeric'},
    WASH_ICONS_REF: ['iconA-wash-bronze.svg', 'iconA-wash-silver.svg', 'iconA-wash-gold.svg'],
    DETAIL_ICONS_REF: ['iconA-detail-interior.svg', 'iconA-detail-exterior.svg', 'iconA-detail-both.svg'],
    DEFAULT_CONTENT_TYPE: 'application/json',
    PROMOTION_TEMPLATE: new Promotion(
        '0000',
        'Welcome to Promotion Manager',
        'Click \'Create New Promotion\' to begin or \'View History\' to modify existing ones.',
        null,
        null,
        null,
        new Date(),
        new Date(),
        null,
        Discount.EMPTY_MODEL,
        null,
        null,
        true
    )
};
