import {CARWASH_TYPE} from '../enums/CARWASH_TYPE.model';
import {Rating} from './rating.model';
import {Address} from './address.model';
import {CarwashCoordinates} from './carwash-coordinates.model';
import {Package} from './package.model';
import {Promotion} from './promotion.model';
import {HoursOfOperation} from '../../components/store-manager/shared/models/hours-of-operation.model';

export class Carwash {


    constructor(
    private _id: string,
    public name: string,
    public type: CARWASH_TYPE,
    public ratings: Rating[],
    public address: Address,
    private _coordinates: CarwashCoordinates,
    public promotions: Promotion[],
    public washPackages: Package[],
    public detailPackages: Package[],
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
