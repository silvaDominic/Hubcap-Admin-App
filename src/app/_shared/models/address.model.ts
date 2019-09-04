import {STATES} from '../enums/STATES.model';

export class Address {
    constructor(private _city: string,
                public state: STATES,
                private _street: string,
                private _zipcode: string) {}

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }

    get zipcode(): string {
        return this._zipcode;
    }

    set zipcode(value: string) {
        this._zipcode = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }
}