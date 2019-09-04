import {WASH_PACKAGE} from '../enums/WASH_PACKAGE.model';
import {SERVICE_TYPE} from '../enums/PACKAGE_TYPE.model';

export class Client {

    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public selectedVehicle: string,
                public plateNumber: string,
                public packageType: SERVICE_TYPE,
                public selectedPackage: WASH_PACKAGE
    ) {}
}