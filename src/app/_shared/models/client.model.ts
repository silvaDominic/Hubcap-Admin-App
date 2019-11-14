import {SERVICE_TYPE} from '../enums/SERVICE_TYPE';

export class Client {

    public static EMPTY_MODEL = <Client>{
        id: null,
        firstName: null,
        lastName: null,
        selectedVehicle: null,
        plateNumber: null,
        packageType: null,
        selectedPackage: null
    };

    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public selectedVehicle: string,
                public plateNumber: string,
                public packageType: SERVICE_TYPE,
                public selectedPackage: string
    ) {}
}
