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
    NUM_ONLY_VALIDATOR: /^\d+$/,
    ALPHABET_NUM_EXT_VALIDATOR: /^[0-9a-zA-Z'\-\s]*$/,
    ALPHABET_EXT_VALIDATOR: /^[a-zA-Z'\s]*$/,
    ALPHABET_NORM_VALIDATOR: /^[a-zA-Z'\s]*$/,
    ALPHABET_ONLY_VALIDATOR: /^[a-zA-Z]*$/,
    ZIPCODE_MIN_LENGTH_VALIDATOR: 5,
    PHONE_NUM_MIN_LENGTH_VALIDATOR: 10,
    STORE_NAME_MAX_LENGTH_VALIDATOR: 30,
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
        '123',
        ROLE.LOCAL_ADMIN,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' +
        '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        '6099231111'
    ),
    REGISTRY_CODE: '123456',
    ADMIN_ROUTES: [
        { path: '/store-manager', title: 'My Store', icon: 'store', class: '' },
        { path: '/employee-manager', title: 'Users', icon: 'people', class: ''},
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
