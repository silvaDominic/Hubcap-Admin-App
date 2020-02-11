import {ROLE} from '../enums/ROLE';

export class Employee {
    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public password: string,
                public email: string,
                public phoneNumber: string,
                public storeIds: string[],
                public role: ROLE,
                public isActive: boolean,
                public isRegistered: boolean) {
    }
}
