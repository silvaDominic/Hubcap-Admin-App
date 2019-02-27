import {ITEM_TYPE} from './item.type.model';

export class PackageItem {
    public name: string;
    public isSelected: boolean;
    public isRequired: boolean;
    public selectedSubOption: string;
    public selectedSubOptions: string[];
    public itemType: ITEM_TYPE;
    public subOptions: string[];

    constructor(name: string,
                isSelected: boolean = false,
                isRequired: boolean = false,
                selectedSubOption: string,
                selectedSubOptions: string[],
                itemType: ITEM_TYPE = ITEM_TYPE.EXTERIOR,
                subOptions: string[]) {

        this.name = name;
        this.isSelected = isSelected;
        this.isRequired = isRequired;
        this.selectedSubOption = selectedSubOption;
        this.selectedSubOptions = selectedSubOptions;
        this.itemType = itemType;
        this.subOptions = subOptions;
    }
}
