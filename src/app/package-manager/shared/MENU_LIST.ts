import { Menu } from './menu.model';

export const SILVER_MENU: Menu = {
    id: 'silver',
    name: 'Silver',
    price: 8,
    menuOptions: [
        {name: 'Wash', subOptions: ['Soft Touch', 'Hand Wash', 'Touch Free'], hasSubOptions: true, isMandatory: true},
        {name: 'Dry', subOptions: ['Machine', 'Hand'], hasSubOptions: true, isMandatory: true},
        {name: 'Tire & Wheel Clean', subOptions: [], hasSubOptions: false, isMandatory: true},
    ]
};

export const GOLD_MENU: Menu = {
    id: 'gold',
    name: 'Gold',
    price: 10,
    menuOptions: [
        {name: 'Wash', subOptions: ['Soft Touch', 'Hand Wash', 'Touch Free'], hasSubOptions: true, isMandatory: true},
        {name: 'Dry', subOptions: ['Machine', 'Hand'], hasSubOptions: true, isMandatory: true},
        {name: 'Tire & Wheel Clean', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Windows Cleaned', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Interior Vacuum', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Interior Clean', subOptions: [], hasSubOptions: false, isMandatory: true}
    ]
};

export const PLATINUM_MENU: Menu = {
    id: 'platinum',
    name: 'Platinum',
    price: 12,
    menuOptions: [
        {name: 'Wash', subOptions: ['Soft Touch', 'Hand Wash', 'Touch Free'], hasSubOptions: true, isMandatory: true},
        {name: 'Dry', subOptions: ['Machine', 'Hand'], hasSubOptions: true, isMandatory: true},
        {name: 'Tire & Wheel Clean', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Undercarriage Wash', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Exterior Gloss/Shine', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Windows Cleaned', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Interior Vacuum', subOptions: [], hasSubOptions: false, isMandatory: true},
        {name: 'Interior Clean', subOptions: [], hasSubOptions: false, isMandatory: true},
    ]
};

