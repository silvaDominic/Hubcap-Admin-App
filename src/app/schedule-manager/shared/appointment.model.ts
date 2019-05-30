import {VEHICLE_TYPE} from '../../shared/models/VEHICLE_TYPE.model';
import {PACKAGE} from '../../shared/models/PACKAGE.model';
import {PACKAGE_TYPE} from '../../shared/models/PACKAGE_TYPE.model';

export class Appointment {
    constructor(public id: string,
                public firstName: string,
                public lastName: string = '',
                public date: string,
                public dropOffTime: string,
                public pickUpTime: string,
                public vehicleType: VEHICLE_TYPE,
                public packageName: PACKAGE,
                public isHCclient: boolean,
                public phoneNumber?: string,
                public email?: string) {}
}
