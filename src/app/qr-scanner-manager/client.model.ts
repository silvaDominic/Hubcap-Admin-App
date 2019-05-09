import {PACKAGE} from '../shared/models/PACKAGE.model';
import {PACKAGE_TYPE} from '../shared/models/PACKAGE_TYPE.model';

export class Client {

    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public selectedVehicle: string,
                public plateNumber: string,
                public packageType: PACKAGE_TYPE,
                public selectedPackage: PACKAGE
                ) {}
}
