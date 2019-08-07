import {Promotion} from '../../promo-manager/shared/models/promotion.model';
import {Discount} from '../../promo-manager/shared/models/discount.model';
import {DISCOUNT_TYPE} from './DISCOUNT_TYPE.model';
import {FREQUENCY_TYPE} from './FREQUENCY_TYPE.model';
import {SERVICE_TYPE} from './PACKAGE_TYPE.model';
import {ALL_PACKAGES} from './ALL_PACKAGES.model';

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
                    '2019-01-01',
                    '2019-12-31',
                    new Map<ALL_PACKAGES, boolean>([
                        [ALL_PACKAGES.SILVER, true],
                        [ALL_PACKAGES.GOLD, true],
                        [ALL_PACKAGES.PLATINUM, true]
                    ]),
                    new Discount(DISCOUNT_TYPE.PERCENT,
                                99,
                                []),
        '09:00',
        '17:00',
        true,
        false
                    )
};
