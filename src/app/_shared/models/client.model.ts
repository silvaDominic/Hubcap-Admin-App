import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';

export class Client {

    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public selectedVehicle: string,
                public plateNumber: string,
                public packageType: SERVICE_TYPE,
                public selectedPackage: string
    ) {}
}