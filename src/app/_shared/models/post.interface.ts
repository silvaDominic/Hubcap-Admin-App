import {Package} from './package.model';
import {Promotion} from './promotion.model';
import {Store} from './store.model';

export interface PackageObject {
    carWashId: string,
    package: Package,
    packageId?: string
}

export interface PackageArrayObject {
    carWashId: string,
    packageArray: Package[],
}

export interface DeletePackageObject {
    carWashId: string,
    packageId: string
}

export interface PromotionObject {
    carWashId: string,
    promotion: Promotion,
    promotionId?: string
}

export interface DeletePromotionObject {
    carWashId: string,
    promotionId: string
}


export interface StoreObject {
    carWashId: string,
    store: Store,
    storeId?: string
}

export interface NewStoreObject {
    userName: string,
    store: Store,
}
