import {VEHICLE_TYPE} from '../../shared/models/VEHICLE_TYPE.model';
import {WASH_PACKAGE} from '../../shared/models/WASH_PACKAGE.model';
import {PACKAGE_TYPE} from '../../shared/models/PACKAGE_TYPE.model';

export class Appointment {
    constructor(public id: string,
                public firstName: string,
                public lastName: string = '',
                public date: string,
                public dropOffTime: string,
                public pickUpTime: string,
                public vehicleType: VEHICLE_TYPE,
                public packageName: WASH_PACKAGE,
                public isHCclient: boolean,
                public phoneNumber?: string,
                public email?: string) {}
}
