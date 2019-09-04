import {PERMISSION_LEVEL} from '../../_shared/enums/PERMISSION_LEVEL.model';

export class AdminUser {
    email: string;
    token: string;
    username: string;
    permissionLevel: PERMISSION_LEVEL;
}
