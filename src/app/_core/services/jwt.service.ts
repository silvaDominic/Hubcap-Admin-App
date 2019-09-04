import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

    getToken(): String {
        console.log('Retrieving Token...');
        console.log('TOKEN: ', window.localStorage['jwtToken']);
        return window.localStorage['jwtToken'];
    }

    saveToken(token: String) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }

}
