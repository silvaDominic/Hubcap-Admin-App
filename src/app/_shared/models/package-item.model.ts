export class PackageItem {

    public static EMPTY_MODEL = <PackageItem>{
        name: null,
        selectedSubOption: null
    };

    constructor(
        public name: string,
        public selectedSubOption: string) {
    }
}
