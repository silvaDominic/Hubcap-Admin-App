import {ITEM_TYPE} from '../enums/ITEM_TYPE.model';

export class PackageItem {

    public static EMPTY_MODEL = <PackageItem>{
        name: '',
        itemType: null,
        selectedSubOptions: [],
        subOptions: []
    };

    constructor(
        public name: string,
        public itemType: ITEM_TYPE = ITEM_TYPE.EXTERIOR,
        public selectedSubOptions: string[],
        public subOptions: string[]) {
    }
}
