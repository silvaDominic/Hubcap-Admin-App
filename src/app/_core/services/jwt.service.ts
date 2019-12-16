import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

    getToken(): String {
        return window.localStorage['jwtToken']; // change to cookie
    }

    saveToken(token: String) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }

}
