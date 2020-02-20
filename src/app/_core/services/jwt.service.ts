import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie';

@Injectable({
    providedIn: 'root',
})
export class JwtService {

    constructor(private readonly cookieService: CookieService) {}

    getToken(): string {
        return this.cookieService.get('authToken'); // change to cookie
    }

    saveToken(token: string) {
        this.cookieService.put('authToken', token);
    }

    destroyToken() {
        this.cookieService.remove('authToken');
    }

}
