import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

    getToken(): string {
        return window.localStorage['jwtToken']; // change to cookie
    }

    saveToken(token: string) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }

}
