import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {constants} from '../../_shared/constants';

@Injectable({
    providedIn: 'root',
})
export class JwtService {

    constructor(private readonly cookieService: CookieService) {}

    getToken(): string {
        return this.cookieService.get(constants.TOKEN_KEY_NAME); // change to cookie
    }

    saveToken(token: string) {
        this.cookieService.put(constants.TOKEN_KEY_NAME, token);
    }

    destroyToken() {
        this.cookieService.remove(constants.TOKEN_KEY_NAME);
    }

}
