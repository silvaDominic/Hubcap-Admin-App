import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {CarwashService} from './carwash.service';
import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';
import {Package} from '../models/package.model';
import {PackageItem} from '../models/package.item.model';
import {Carwash} from '../models/carwash.model';
import {Rating} from '../models/rating.model';
import {Promotion} from '../models/promotion.model';
import {Address} from '../models/address.model';
import {CarwashCoordinates} from '../models/carwash-coordinates.model';
import {Discount} from '../models/discount.model';
import {StoreHours} from '../../components/store-manager/shared/models/store-hours.model';
import {HoursException} from '../../components/store-manager/shared/models/hours-exception.model';
import {HoursOfOperation} from '../../components/store-manager/shared/models/hours-of-operation.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class PackageService {
    private packageSubject = new BehaviorSubject<Package>(<Package>{});
    private packagesSubject = new BehaviorSubject<Package[]>(<Package[]>[]);
    private allPackageItems: PackageItem[] = [];
    private readonly _package: Observable<Package> = this.packageSubject.asObservable();
    private readonly _packages: Observable<Package[]> = this.packagesSubject.asObservable();

    private currentPackageIndex: number;
    public serviceReady: boolean;

    constructor(private carwashService: CarwashService) {
        this.allPackageItems = carwashService.getAllPackageItems();
        this.loadPackages(SERVICE_TYPE.WASH);
        this.currentPackageIndex = 1;
    }

    // Initializes packages and package items
    public loadPackages(type: SERVICE_TYPE) {
        this.serviceReady = false;
        console.log('_LOADING PACKAGES_');
        this.carwashService.getAllPackages(type).subscribe(
            packages => {
                this.packagesSubject.next(packages);
                this.packageSubject.next(packages[this.currentPackageIndex]);
                console.log('_LOADING PACKAGES COMPLETE_');
                this.serviceReady = true;
            }
        );
    }

    get package(): Observable<Package> {
        if (!this._package) {
            console.log('Package is null');
            this.loadPackages(SERVICE_TYPE.WASH);
        }
        return this._package;
    }

    public setPackage(index: number) {
        if (index !== this.currentPackageIndex) {
            console.log('_SET PACKAGE_');
            this.currentPackageIndex = index;
            this.packageSubject.next(this.packagesSubject.getValue()[index]);
        } else {
            return;
        }
    }

    get packages(): Observable<Package[]> {
        return this._packages;
    }

    getPackageItems(): Observable<PackageItem[]> {
        return this._package.pipe(
            pluck('packageItems')
        );
    }

/*    get displayPackages(): Map<PackageItem, boolean> {
        return this._displayPackages;
    }*/

/*    public resetDisplayPackages(): void {
        // Fill list of display packages
        for (const item of this.allPackageItems) {
            this.displayPackages.set(item, false);
        }
    }*/

/*    setDisplayPackage(packageItem: PackageItem, selected: boolean) {
        this._displayPackages.set(packageItem, selected);
    }*/

    public setPackageArray(type: SERVICE_TYPE) {
        console.log('_SET PACKAGE ARRAY');
        this.loadPackages(type);
    }

    public getType(): Observable<SERVICE_TYPE> {
        return this._package.map(
            _package => {return _package.type}
        );
    }

    // Static list of packages
    public getAllPackageItems(): PackageItem[] {
        return this.allPackageItems;
    }

    /* --------------------- UTIL METHODS (From Carwash Service) ------------------------- */

    private convertToPackageItemsArray(data: any): PackageItem[] {
        const packageItems = Array<PackageItem>();
        data.packageItems.map(item => packageItems.push(this.generatePackageItem(item)));
        return packageItems;
    }


    // Main util method for converting json data to instance objects
    private convertToCarwashObject(data: any): Carwash {
        const ratings = Array<Rating>();
        data.ratings.map(rating => ratings.push(this.generateRating(rating)));

        const promotions = Array<Promotion>();
        data.promotions.map(promotion => promotions.push(this.generatePromotion(promotion)));

        const washPackages = Array<Package>();
        data.washPackages.map(washPackage => washPackages.push(this.generatePackage(washPackage)));

        const detailPackages = Array<Package>();
        data.detailPackages.map(detailPackage => detailPackages.push(this.generatePackage(detailPackage)));

        return new Carwash(
            data.id,
            data.name,
            data.type,
            ratings,
            this.generateAddress(data.address),
            this.generateCoordinates(data.coordinates),
            promotions,
            washPackages,
            detailPackages,
            this.generateHoursOfOperation(data.hoursOfOperation)
        );
    }

    private generateAddress(data: any): Address {
        return new Address(
            data.city,
            data.state,
            data.street,
            data.zipcode
        );
    }

    private generateCoordinates(data: any): CarwashCoordinates {
        return new CarwashCoordinates(
            data.latitude,
            data.longitude
        );
    }

    private generateRating(data: any): Rating {
        return new Rating(
            data.customerName,
            data.score,
            data.review,
            data.date
        );
    }

    private generatePromotion(data: any): Promotion {
        return new Promotion(
            data.id,
            data.name,
            data.description,
            data.serviceType,
            data.frequencyType,
            data.frequency,
            data.startDate,
            data.endDate,
            data.discountPackages,
            this.generateDiscount(data.discount),
            data.startTime,
            data.endTime
        );
    }

    private generateDiscount(data: any): Discount {
        return new Discount(
            data.E_DISCOUNT_TYPE,
            data.discountAmount,
            data.discountFeatures
        );
    }

    private generatePackage(data: any): Package {
        return new Package(
            data.name,
            data.type,
            data.onetimePrices,
            data.packageItems.map(packageItem => this.generatePackageItem(packageItem)),
            data.duration,
            data.monthlyPrices,
            data.isUnlimitedMonthly,
            data.monthlyUses
        );
    }

    private generatePackageItem(data: any): PackageItem {
        return new PackageItem(
            data.name,
            data.isRequired,
            data.itemType,
            data.selectedSubOptions,
            data.subOptions
        );
    }

    private generateHoursOfOperation(data: any) {
        const storeHours = Array<StoreHours>();
        data.storeHours.map(storeHour => storeHours.push(this.generateStoreHours(storeHour)));

        const hoursExceptions = Array<HoursException>();
        data.storeHours.map(exception => hoursExceptions.push(this.generateHoursExceptions(exception)))

        return new HoursOfOperation(
            storeHours,
            hoursExceptions
        );
    }

    private generateHoursExceptions(data: any): HoursException {
        return new HoursException(
            data.name,
            data.date,
            data.exceptionType,
            data.openTime,
            data.closeTime);
    }

    private generateStoreHours(data: any): StoreHours {
        return new StoreHours(
            data.day,
            data.openTime,
            data.closeTime
        );
    }
}
