import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../../qr-scanner-manager/client.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    clientsdUrl = 'http://localhost:4200/assets/data/clients.json';

    constructor(private http: HttpClient) {}

    fetchClient(client: Client): Observable<Client> {
        return this.http.get<Client>(this.clientsdUrl);
    }
}
