import {Role} from './role.model';

export class User {
    constructor(public id: string,
                public firstName: string,
                public lastName: string,
                public password: string,
                public email: string,
                public phoneNumber: string,
                public storeIds: string[],
                public role: Role,
                public isActive: boolean,
                public isRegistered: boolean) {
    }
}
