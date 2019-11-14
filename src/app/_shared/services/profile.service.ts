import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AdminUser} from '../../_core/models/admin-user.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private readonly adminUserSubject = new BehaviorSubject(AdminUser)

}
