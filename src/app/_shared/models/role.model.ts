import {ROLE} from '../enums/ROLE';

export class Role {

    constructor(public name: string, public permissionLevel: ROLE) {
    }

/*    get permissionLevel(): PERMISSION_LEVEL {
        return this._privilege;
    }

    set permissionLevel(value: PERMISSION_LEVEL) {
        this._privilege = value;
    }*/
}
