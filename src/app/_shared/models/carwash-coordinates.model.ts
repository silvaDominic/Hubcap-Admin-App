export class CarwashCoordinates {

    public static EMPTY_MODEL = <CarwashCoordinates>{
        latitude: '',
        longitude: ''
    };

    constructor(private _latitude: string,
                private _longitude: string) {}

    get latitude(): string {
        return this._latitude;
    }

    set latitude(value: string) {
        this._latitude = value;
    }

    get longitude(): string {
        return this._longitude;
    }

    set longitude(value: string) {
        this._longitude = value;
    }
}
