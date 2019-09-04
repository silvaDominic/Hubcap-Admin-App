import {ITEM_TYPE} from '../enums/ITEM_TYPE.model';

export class PackageItem {

    constructor(    public name: string,
    public isRequired: boolean,
    public itemType: ITEM_TYPE = ITEM_TYPE.EXTERIOR,
    public selectedSubOptions: string[],
    public subOptions: string[],
    public isSelected?: boolean) {
    }
}
