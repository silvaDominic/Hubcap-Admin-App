import {PERMISSION_LEVEL} from '../enums/PERMISSION_LEVEL.model';

export class Role {

    constructor(public name: string, public permissionLevel: PERMISSION_LEVEL) {
    }

/*    get permissionLevel(): PERMISSION_LEVEL {
        return this._privilege;
    }

    set permissionLevel(value: PERMISSION_LEVEL) {
        this._privilege = value;
    }*/
}
