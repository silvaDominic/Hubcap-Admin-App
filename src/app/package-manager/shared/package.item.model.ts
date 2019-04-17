import {ITEM_TYPE} from '../../shared/models/ITEM_TYPE.model';

export class PackageItem {

    constructor(public name: string, public isSelected: boolean = false,
                public isRequired: boolean = false, public selectedSubOption: string,
                public selectedSubOptions: string[], public itemType: ITEM_TYPE = ITEM_TYPE.EXTERIOR,
                public subOptions: string[]) {}
}
