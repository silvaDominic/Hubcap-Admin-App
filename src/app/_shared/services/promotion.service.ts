import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../../promo-manager/shared/models/promotion.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarwashService} from './carwash.service';
import {CONSTANTS} from '../models/CONSTANTS';
import {Discount} from '../../promo-manager/shared/models/discount.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    // public promotion: Promotion;
    public livePromotion: BehaviorSubject<Promotion>;
    public promotionForm: FormGroup;
    public promotions: Promotion[];

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient,
        private readonly carwashService: CarwashService
    ) {}

    public stagePromotion(id: string): void {
        this.livePromotion = new BehaviorSubject(this.carwashService.getPromotion(id));
        // this.initLivePromotion();
        console.log('SELECTED PROMOTION: ', this.livePromotion.getValue());
    }

    public stageTemplatePromotion(): void {
        this.livePromotion = new BehaviorSubject(CONSTANTS.PROMOTION_TEMPLATE);
        // this.initLivePromotion();
        console.log('SELECTED PROMOTION: ', this.livePromotion.getValue());
    }

    // Returns the raw Promotion value
    public getPromotion(): Promotion {
        if (!this.livePromotion) {
            console.log('No promotion staged!');
            console.log('Setting template');
            this.stageTemplatePromotion();
        }
        return this.livePromotion.getValue();
    }

    public initLivePromotion() {
        this.livePromotion = new BehaviorSubject(<Promotion>{});
        this.livePromotion.asObservable();
    }

    public getForm(): FormGroup {
        if (!this.promotionForm) {
            console.log('No promotion form initialized');
            console.log('Initializing...');
            this.promotionForm = this.generatePromotionForm(this.getPromotion());
        }
        return this.promotionForm;
    }

    public getFormControls(): any {
        if (!this.promotionForm) {
            console.log('Cannot retrieve controls without first initializing form');
            console.log('Initializing...');
            this.getForm();
        }
        return this.promotionForm;
    }


    getAllPromotions(): Promotion[] {
        return this.carwashService.getPromotions();
    }

/*    updatePromotions(_promotions: Promotion[]): Observable<Promotion[]> {
        return this.http.put<Promotion[]>(this.promotionsUrl, _promotions);
    }

    updatePromotion(_promotion: Promotion): Observable<Promotion> {
        return this.http.put<Promotion>(this.promotionsUrl, _promotion);
    }

    newPromotion(_promotion: Promotion): Observable<Promotion> {
        return this.http.post<Promotion>(this.promotionsUrl, _promotion);
    }*/

    /* ----------------- FORM METHODS ------------------- */

    public generatePromotionForm(promotion: Promotion) {
        return this.fb.group( {
            packageTypeFormGroup: this.generatePackageTypeFormGroup(promotion),
            nameFormGroup: this.generateNameFormGroup(promotion),
            descriptionFormGroup: this.generateDescriptionFormGroup(promotion),
            frequencyFormGroup: this.generateFrequencyFormGroup(promotion),
            discountFormGroup: this.generateDiscountFormGroup(promotion),
            discountPackagesFormGroup: this.genererateDiscountPackagesFormGroup(promotion),
            activeTimeFormGroup: this.generateActiveTimeFormGroup(promotion)
        });
    }

    private generatePackageTypeFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
            packageType: [promotion.serviceType, Validators.required],
        });
    }

    private generateNameFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
            name: [promotion.name, Validators.required],
        });
    }

    private generateDescriptionFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
            description: [promotion.description, Validators.required],
        });
    }

    private generateFrequencyFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
            frequencyType: [promotion.frequencyType, Validators.required],
            frequency: [promotion.frequency, Validators.required],
            startDate: [promotion.startDate, Validators.required],
            endDate: [promotion.endDate, Validators.required],
        });
    }

    private generateDiscountFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
                    discountType: [promotion.discount.discountType, Validators.required],
                    discountAmount: [promotion.discount.discountAmount],
                    discountFeatures: [promotion.discount.discountFeatures]
        });
    }

    private genererateDiscountPackagesFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
            discountPackages: [promotion.discountPackages, Validators.required],
        });
    }

    private generateActiveTimeFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
            startTime: [promotion.startTime, Validators.required],
            endTime: [promotion.endTime, Validators.required],
            isAllDay: [promotion.isAllDay]
        });
    }

    /* ------------------ UTILITY METHODS ------------------ */
    private generateId(): string {
        return (Math.random() * 10).toString();
    }

    public convertFormToModel(controls: any): Promotion {
        return new Promotion(
            this.generateId(),
            controls.type,
            controls.name,
            controls.description,
            controls.frequencyType,
            controls.frequency,
            controls.startDate,
            controls.endDate,
            controls.serviceType,
            new Discount(
                controls.discount.discountType,
                controls.discount.discountAmount,
                controls.discount.discountFeatures
            ),
            controls.startTime,
            controls.endTime,
            controls.isAllDay,
            controls.isActive
        );
    }
}
