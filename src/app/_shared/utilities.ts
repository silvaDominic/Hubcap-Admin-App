import {Discount} from './models/discount.model';
import {Address} from './models/address.model';
import {Promotion} from './models/promotion.model';
import {HoursOfOperation} from './models/hours-of-operation.model';
import {StoreHours} from './models/store-hours.model';
import {Carwash} from './models/carwash.model';
import {HoursException} from './models/hours-exception.model';
import {Package} from './models/package.model';
import {Store} from './models/store.model';
import {PackageItem} from './models/package-item.model';
import {Frequency} from './models/frequency.model';

export class Utilities {

    // Main util method for converting json data to instance objects
    public static convertToCarwashObject(data: any): Carwash {
        const promotions = Array<Promotion>();
        data.promotions.map(promotion => promotions.push(Utilities.generatePromotion(promotion)));

        const washPackages = Array<Package>();
        data.washPackages.map(washPackage => washPackages.push(Utilities.generatePackage(washPackage)));

        const detailPackages = Array<Package>();
        data.detailPackages.map(detailPackage => detailPackages.push(Utilities.generatePackage(detailPackage)));

        return new Carwash(
            Utilities.generateMetaData(data.metaData),
            promotions,
            washPackages,
            detailPackages
        );
    }

    public static generateMetaData(data: any): Store {
        return new Store(
            data.id,
            data.name,
            data.type,
            Utilities.generateAddress(data.address),
            data.phoneNumber,
            data.coordinates,
            Utilities.generateHoursOfOperation(data.hoursOfOperation),
            data.email,
            data.website
        )
    }

    public static generateAddress(data: any): Address {
        return new Address(
            data.city,
            data.state,
            data.street,
            data.zipcode
        );
    }

    public static convertToPackageItemsArray(data: any): PackageItem[] {
        const packageItems = Array<PackageItem>();
        data.packageItems.map(item => packageItems.push(this.generatePackageItem(item)));
        return packageItems;
    }

/*    public static generateRating(data: any): Rating {
        return new Rating(
            data.customerName,
            data.score,
            data.review,
            data.date
        );
    }*/

    public static generatePromotion(data: any): Promotion {
        return new Promotion(
            data.id,
            data.name,
            data.description,
            data.serviceType,
            data.isReoccurring,
            this.generateFrequency(data.frequency),
            new Date(data.startDate),
            new Date(data.endDate),
            data.discountPackages,
            this.generateDiscount(data.discount),
            data.startTime,
            data.endTime,
            data.isActive
        );
    }

    public static generateFrequency(data: any): Frequency {
        return new Frequency(
            data.type,
            data.value
        )
    }

    public static generateDiscount(data: any): Discount {
        return new Discount(
            data.discountType,
            data.discountAmount,
            data.discountFeatures
        );
    }

    public static generatePackage(data: any): Package {
        return new Package(
            data.id,
            data.name,
            data.type,
            data.oneTimePrices,
            data.packageItems.map(packageItem => this.generatePackageItem(packageItem)),
            data.duration,
            data.monthlyPrices
        );
    }

    public static generatePackageItem(data: any): PackageItem {
        return new PackageItem(
            data.name,
            data.selectedSubOption
        );
    }

    public static generateHoursOfOperation(data: any) {
        const storeHours = Array<StoreHours>();
        data.storeHours.map(storeHour => storeHours.push(this.generateStoreHours(storeHour)));

        const hoursExceptions = Array<HoursException>();
        data.hoursExceptions.map(exception => hoursExceptions.push(this.generateHoursExceptions(exception)));

        return new HoursOfOperation(
            storeHours,
            hoursExceptions
        );
    }

    public static generateHoursExceptions(data: any): HoursException {
        return new HoursException(
            data.name,
            data.date,
            data.exceptionType,
            data.openTime,
            data.closeTime);
    }

    public static generateStoreHours(data: any): StoreHours {
        return new StoreHours(
            data.day,
            data.openTime,
            data.closeTime,
            data.isOpen
        );
    }

    constructor() {}
}
