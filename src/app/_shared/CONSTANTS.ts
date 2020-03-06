import {Promotion} from './models/promotion.model';
import {Discount} from './models/discount.model';
import {User} from '../_core/models/admin-user.model';
import {ROLE} from './enums/ROLE';

export const CONSTANTS = {
    SHORT_WEEKDAY: {weekday: 'short'},
    SHORT_MONTH: {month: 'short'},
    NUM_DAY: {day: 'numeric'},
    NUM_YEAR: {year: 'numeric'},
    WASH_ICONS_REF: ['iconA-wash-bronze.svg', 'iconA-wash-silver.svg', 'iconA-wash-gold.svg'],
    DETAIL_ICONS_REF: ['iconA-detail-interior.svg', 'iconA-detail-exterior.svg', 'iconA-detail-both.svg'],
    DEFAULT_CONTENT_TYPE: 'application/json',
    TOKEN_KEY_NAME: 'Bearer Token',
    NUM_NON_NEG_WHOLE_VALIDATOR: /^(?:[1-9][0-9]*|0)$/,
    NUM_ONLY_VALIDATOR: /^\d+$/,
    NUM_ONLY_NON_ZERO: /^[1-9]\d*$/,
    ALPHABET_NUM_EXT_VALIDATOR: /^[0-9a-zA-Z'\-\s]*$/,
    ALPHABET_EXT_VALIDATOR: /^[a-zA-Z'\-\s]*$/,
    ALPHABET_NORM_VALIDATOR: /^[a-zA-Z'\s]*$/,
    ALPHABET_ONLY_VALIDATOR: /^[a-zA-Z]*$/,
    ZIPCODE_MIN_LENGTH_VALIDATOR: 5,
    PHONE_NUM_MIN_LENGTH_VALIDATOR: 10,
    STORE_NAME_MAX_LENGTH_VALIDATOR: 30,
    FIRST_NAME_MAX_LENGTH_VALIDATOR: 25,
    LAST_NAME_MAX_LENGTH_VALIDATOR: 30,
    PASSWORD_MIN_LENGTH_VALIDATOR: 6,
    PASSWORD_MAX_LENGTH_VALIDATOR: 18,
    REGISTRY_CODE_LENGTH_VALIDATOR: 6,
    PACKAGE_NAME_MAX_LENGTH_VALIDATOR: 25,
    PACKAGE_PRICE_MAX_LENGTH_VALIDATOR: 4,
    PACKAGE_DURATION_MAX_LENGTH_VALIDATOR: 4,
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
    ),
    VALID_USER: new User(
        'Dominic',
        'Silva',
        'dom.92@live.com',
        '123123',
        ROLE.LOCAL_ADMIN,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' +
        '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        '6099231111'
    ),
    REGISTRY_CODE: '123456',
    ADMIN_ROUTES: [
        { path: '/store-manager', title: 'My Store', icon: 'store', class: '' },
        { path: '/employee-manager', title: 'Employee Manager', icon: 'people', class: ''},
        { path: '/package-manager', title: 'Package Manager',  icon: 'view_carousel', class: '' },
        { path: '/promotions-manager', title: 'Promotional Manager',  icon: 'stars', class: '' },
        { path: '/schedule-manager', title: 'Scheduler', icon: 'calendar_today', class: '' },
    ],
    BASE_ROUTES: [
        { path: '/profile', title: 'Profile',  icon: 'person', class: '' },
        { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
        { path: '/qr-scanner-manager', title: 'QR Scanner', icon: 'control_camera', class: '' },
    ]
};
