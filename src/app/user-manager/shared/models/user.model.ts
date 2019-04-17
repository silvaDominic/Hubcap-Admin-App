import {Role} from './role.model';

export class User {
    constructor(public id: string,
                public name: string,
                public password: string,
                public email: string,
                public storeIds: string[],
                public role: Role,
                public isActive: boolean,
                public isRegistered: boolean) {
    }
}
