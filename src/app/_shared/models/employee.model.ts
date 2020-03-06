import {ROLE} from '../enums/ROLE';

export class Employee {

    public static EMPTY_MODEL = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        storeIds: new Array<string>(),
        role: null,
        isActive: false,
        isRegistered: false
    };

    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public email: string,
                public phoneNumber: string,
                public storeIds: string[],
                public role: ROLE,
                public isActive: boolean,
                public isRegistered: boolean) {
    }
}
