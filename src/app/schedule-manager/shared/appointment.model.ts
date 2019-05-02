import {VEHICLE_TYPE} from '../../shared/models/VEHICLE_TYPE.model';
import {PACKAGE} from '../../shared/models/PACKAGE.model';

export class Appointment {
    constructor(public id: string,
                public clientName: string,
                public date: string,
                public dropOffTime: string,
                public pickUpTime: string,
                public vehicleType: VEHICLE_TYPE,
                public _package: PACKAGE,
                public isHCclient: boolean,
                public phoneNumber?: string) {}
}
