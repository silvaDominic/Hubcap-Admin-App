export class PackageItem {
    public name: string;
    public subOptions: string[];
    public hasSubOptions: boolean;
    public isMandatory: boolean;

    constructor(name: string, subOptions: string[], hasSubOptions: boolean, isMandatory: boolean) {
        this.name =  name;
        this.subOptions = subOptions;
        this.hasSubOptions = hasSubOptions;
        this.isMandatory = isMandatory;
    }
}
