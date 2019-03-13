import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../../promo-manager/shared/promotion.model';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    promotionsUrl = 'http://localhost:4200/assets/data/promotions.json';

    constructor(private http: HttpClient) {}

    getAllPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(this.promotionsUrl);
    }
}
