export class PackageItem {

    public static EMPTY_MODEL = <PackageItem>{
        name: '',
        selectedSubOption: ''
    };

    constructor(
        public name: string,
        public selectedSubOption: string) {
    }
}
