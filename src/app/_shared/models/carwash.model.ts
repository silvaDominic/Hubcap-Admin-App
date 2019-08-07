import {CARWASH_TYPE} from './CARWASH_TYPE.model';
import {Rating} from './rating.model';
import {Address} from './address.model';
import {Promotion} from '../../promo-manager/shared/models/promotion.model';
import {Package} from '../../package-manager/shared/package.model';
import {StoreHours} from '../../store-manager/shared/models/store-hours.model';
import {CarwashCoordinates} from './carwash-coordinates.model';
import {HoursOfOperation} from '../../store-manager/shared/models/hours-of-operation.model';

export class Carwash {


    constructor(
    private _id: string,
    public name: string,
    public type: CARWASH_TYPE,
    public ratings: Rating[],
    public address: Address,
    private _coordinates: CarwashCoordinates,
    public promotions: Promotion[],
    public silverPackage: Package,
    public goldPackage: Package,
    public platinumPackage: Package,
    public exteriorPackage: Package,
    public interiorPackage: Package,
    public completePackage: Package,
    public hoursOfOperation: HoursOfOperation) {
    }

    public getId(): string {
        return this._id;
    }

    public get coordinates(): CarwashCoordinates {
        return this._coordinates;
    }

    public set coordinates(value: CarwashCoordinates) {
        this._coordinates = value;
    }
}
