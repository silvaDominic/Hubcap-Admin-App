import {ITEM_TYPE} from '../enums/ITEM_TYPE.model';

export class DisplayPackageItem {

    public static EMPTY_MODEL = <DisplayPackageItem>{
        name: null,
        itemType: null,
        selectedSubOption: null,
        subOptions: []
    };

    constructor(
        public name: string,
        public itemType: ITEM_TYPE = ITEM_TYPE.EXTERIOR,
        public selectedSubOption: string,
        public subOptions: string[]) {
    }
}
