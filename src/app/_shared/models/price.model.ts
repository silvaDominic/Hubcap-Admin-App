export class Price {

    public static EMPTY_MODEL = <Price>{
        REGULAR: null,
        OVERSIZED: null
    };

    constructor(
        public REGULAR: string,
        public OVERSIZED: string) {
    }
}
