import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../../promo-manager/shared/models/promotion.model';
import {WASH_PACKAGE} from '../models/WASH_PACKAGE.model';
import {DETAIL_PACKAGE} from '../models/DETAIL_PACKAGE.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    static detailPackageKeys = Object.keys(DETAIL_PACKAGE);
    static washPackageKeys = Object.keys(WASH_PACKAGE);

    private promotionsUrl = 'http://localhost:4200/assets/data/promotions.json';

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient
    ) {}

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

    public generateNameForm(apiResponse: any): FormGroup {
        return this.fb.group({
            name: [apiResponse.name, Validators.required]
        })
    }

    public generateDescriptionForm(apiResponse: any): FormGroup {
        return this.fb.group({
            description: [apiResponse.description, Validators.required]
        })
    }

    public generateFrequencyForm(apiResponse: any): FormGroup {
        return this.fb.group({
            frequencyType: [apiResponse.frequencyType, Validators.required],
            frequency: [apiResponse.frequency, Validators.required],
            startDate: [apiResponse.startDate, Validators.required],
            endDate: [apiResponse.endDate, Validators.required],
        })
    }

    public generatePackageTypeForm(apiResponse: any): FormGroup {
        return this.fb.group({
            packageType: [apiResponse.packageType, Validators.required]
        })
    }

    public generateDiscountForm(apiResponse: any): FormGroup {
        return this.fb.group({
                    discountType: [apiResponse.discountType, Validators.required],
                    discountAmount: [apiResponse.discountAmount],
                    discountFeatures: [apiResponse.discountFeatures]
        })
    }

    public generateDiscountPackagesForm(apiResponse: any): FormGroup {
        return this.fb.group({
            discountPackages: [apiResponse.discountPackages, Validators.required]
        })
    }

    public generateActiveTimeForm(apiResponse: any): FormGroup {
        return this.fb.group({
            startTime: [apiResponse.startTime, Validators.required],
            endTime: [apiResponse.endTime, Validators.required],
            isAllDay: [apiResponse.isAllDay]
        })
    }
}
