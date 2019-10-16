import {VEHICLE_TYPE} from '../enums/VEHICLE_TYPE.model';

export class Appointment {
    constructor(public id: string,
                public firstName: string,
                public lastName: string = '',
                public date: string,
                public dropOffTime: string,
                public pickUpTime: string,
                public vehicleType: VEHICLE_TYPE,
                public packageName: string,
                public isHCclient: boolean,
                public phoneNumber?: string,
                public email?: string) {}
}
