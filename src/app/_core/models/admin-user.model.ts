import {ROLE} from '../../_shared/enums/ROLE';

export class User {

    public static EMPTY_MODEL = <User>{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: null,
        token: '',
        phoneNumber: ''
    };

    constructor(public firstName: string,
                public lastName: string,
                public email: string,
                public password: string,
                public role: ROLE,
                private _token: string,
                public phoneNumber?: string) {
    }

    public get token() {
        return this._token;
    }
}
