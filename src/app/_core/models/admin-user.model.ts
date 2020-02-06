import {ROLE} from '../../_shared/enums/ROLE';

export class AdminUser {

    public static EMPTY_MODEL = <AdminUser>{
        email: '',
        password: '',
        role: null
    };

    constructor(public email: string, public password: string, public role: ROLE) {}
}
