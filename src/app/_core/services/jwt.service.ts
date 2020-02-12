import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Injectable({
    providedIn: 'root',
})
export class JwtService {

    constructor(private readonly cookieService: CookieService) {}

    getToken(): string {
        return this.cookieService.get('jwtToken'); // change to cookie
    }

    saveToken(token: string) {
        this.cookieService.put('jwtToken', token);
    }

    destroyToken() {
        this.cookieService.remove('jwtToken');
    }

}
