import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../../promo-manager/shared/promotion.model';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    private _focusPromotion: Promotion;
    private promotionsUrl = 'http://localhost:4200/assets/data/promotions.json';

    constructor(private http: HttpClient) {}

    fetchAllPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(this.promotionsUrl);
    }

    updatePromotions(_promotions: Promotion[]): Observable<Promotion[]> {
        return this.http.put<Promotion[]>(this.promotionsUrl, _promotions);
    }

    updatePromotion(_promotion: Promotion): Observable<Promotion> {
        return this.http.put<Promotion>(this.promotionsUrl, _promotion);
    }

    newPromotion(_promotion: Promotion): Observable<Promotion> {
        return this.http.post<Promotion>(this.promotionsUrl, _promotion);
    }

    get focusPromotion(): Promotion {
        return this._focusPromotion;
    }

    set focusPromotion(value: Promotion) {
        this._focusPromotion = value;
        console.log('FOCUS PACKAGE: ', this._focusPromotion);
    }

    createNewPromotion() {
        this._focusPromotion = new Promotion();
    }

/*    callRefreshHistory() {
        this.promoHistory.refreshHistory();
    }*/
}
