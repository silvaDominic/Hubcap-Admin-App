import {Package} from '../models/package.model';
import {Promotion} from '../models/promotion.model';
import {Store} from '../models/store.model';
import {Role} from '../models/role.model';
import {Employee} from '../models/employee.model';

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

export interface NewEmployeeObject {
    carWashId: string,
    employeeRole: Role
}

export interface EmployeeObject {
    carWashId: string,
    employee: Employee
}

export interface DeleteEmployeeObject {
    carWashId: string,
    employeeId: string
}
