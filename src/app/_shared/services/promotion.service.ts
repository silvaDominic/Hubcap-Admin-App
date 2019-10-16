import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarwashService} from './carwash.service';
import {CONSTANTS} from '../CONSTANTS';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Discount} from '../models/discount.model';
import {Promotion} from '../models/promotion.model';
import {PackageItem} from '../models/package.item.model';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    // public promotion: Promotion;
    private promotionSubject = new BehaviorSubject<Promotion>(<Promotion>{});
    private promotionsSubject = new BehaviorSubject<Promotion[]>(<Promotion[]>[]);
    public _promotions = this.promotionsSubject.asObservable();
    public _promotion = this.promotionSubject.asObservable();
    private readonly _allPackageItems = of(new Array<PackageItem>());

    private currentPromotionIndex = 0;
    private currentPromotionId: string = null;
    public serviceReady = false;

    constructor(
        private readonly fb: FormBuilder,
        private readonly http: HttpClient,
        private readonly carwashService: CarwashService
    ) {
        this._allPackageItems = carwashService.getAllPackageItems();
        this.loadPromotions();
    }

    public loadPromotions(): void {
        this.serviceReady = false;
        console.log('_LOADING PROMOTIONS_');
        this.carwashService.getPromotionsArray().subscribe(
            promotions => {
                if (promotions !== null || undefined) {
                    this.promotionsSubject.next(promotions);
                    this.promotionSubject.next(promotions[this.currentPromotionIndex]);
                    // this.currentPromotionId = this.promotionSubject.getValue().id;
                    this.serviceReady = true;
                    console.log('_LOADING PROMOTIONS COMPLETE_');
                    console.log('CURRENT PROMOTION: ', this.promotionSubject.getValue());
                } else {
                    console.log('_NO PROMOTIONS FOUND_');
                }
            }
        );
    }

    public get promotion(): Observable<Promotion> {
        if (!this._promotion) {
            console.log('Promotion is null');
            this.loadPromotions();
        }
        return this._promotion;
    }

    public get promotions(): Observable<Promotion[]> {
        if (!this._promotions) {
            console.log('Promotion array is null');
            this.loadPromotions();
        }
        return this._promotions;
    }

    get allPackageItems(): Observable<PackageItem[]> {
        return this._allPackageItems;
    }

    public setPromotion(index: number): void {
        if (index !== this.currentPromotionIndex) {
            console.log('_SET PROMOTION_');
            this.currentPromotionIndex = index;
            this.promotionSubject.next(this.promotionsSubject.getValue()[index]); // TODO Check if the Observable should be loaded instead
        } else {
            return;
        }
    }

    public setPromotionById(id: string): void {
        if (id !== this.currentPromotionId) {
            console.log('_SET PROMOTION BY ID_');
            this.currentPromotionId = id;
            this.promotionsSubject.getValue().filter(
                (promotion) => {
                    if (promotion.id === this.currentPromotionId) {
                        this.promotionSubject.next(promotion);
                    }
                }
            );
        }
    }

    public toggleActive(id: string) {
        console.log('_SET PROMOTION BY ID_');
        const currentPromotionsArrayValue = this.promotionsSubject.getValue();
        currentPromotionsArrayValue.filter(
            (promotion) => {
                if (promotion.id === id) {
                    console.log('PROMO EXISTS: ', id);
                    if (promotion.isActive) {
                        promotion.isActive = false;
                    } else if (!promotion.isActive) {
                        promotion.isActive = true;
                    }
                    return;
                } else {
                    console.log('NO PROMO EXISTS: ', id);
                }
            }
        );
        this.promotionsSubject.next([...currentPromotionsArrayValue]);
    }

    public stageTemplatePromotion(): void {
        this.promotionSubject.next(CONSTANTS.PROMOTION_TEMPLATE);
        // this.initLivePromotion();
        console.log('SELECTED PROMOTION: ', this.promotionSubject.getValue());
    }

    /* ----------------- FORM METHODS ------------------- */

    public getForm(): FormGroup {
        return this.generatePromotionForm(Promotion.EMPTY_MODEL);
    }

    public generatePromotionForm(promotion: Promotion) {
        return this.fb.group( {
            serviceTypeFormGroup: this.generateServiceTypeFormGroup(promotion),
            nameFormGroup: this.generateNameFormGroup(promotion),
            descriptionFormGroup: this.generateDescriptionFormGroup(promotion),
            frequencyFormGroup: this.generateFrequencyFormGroup(promotion),
            discountFormGroup: this.generateDiscountFormGroup(promotion),
            discountPackagesFormGroup: this.genererateDiscountPackagesFormGroup(promotion),
            activeTimeFormGroup: this.generateActiveTimeFormGroup(promotion)
        });
    }

    private generateServiceTypeFormGroup(promotion: Promotion): FormGroup {
        return this.fb.group({
            serviceType: [promotion.serviceType, Validators.required],
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
        });
    }

    /* ------------------ UTILITY METHODS ------------------ */
    private generateId(): string {
        return (Math.random() * 10).toString();
    }

    public convertFormToModel(controls: any): Promotion {
        return new Promotion(
            this.generateId(),
            controls.name,
            controls.description,
            controls.serviceType,
            controls.frequencyType,
            controls.frequency,
            controls.startDate,
            controls.endDate,
            controls.discountPackages,
            new Discount(
                controls.discount.discountType,
                controls.discount.discountAmount,
                controls.discount.discountFeatures
            ),
            controls.startTime,
            controls.endTime,
            false
        );
    }
}
