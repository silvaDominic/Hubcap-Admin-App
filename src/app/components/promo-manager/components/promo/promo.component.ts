import {Component, Input, OnInit} from '@angular/core';
import {Promotion} from '../../../../_shared/models/promotion.model';
import {DISCOUNT_TYPE} from '../../../../_shared/enums/DISCOUNT_TYPE.model';
import {PromotionService} from '../../../../_shared/services/promotion.service';
import {CONSTANTS} from '../../../../_shared/constants';
import {FREQUENCY} from '../../../../_shared/enums/FREQUENCY.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogBoxService} from '../../../../_shared/services/dialog-box.service';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

    @Input() thisPromotion: Promotion;
    @Input() promoIndex: number;
    public step = 0;

    public E_FREQUENCY = FREQUENCY;
    public E_DISCOUNT_TYPE = DISCOUNT_TYPE;
    public C_CONSTANTS = CONSTANTS;

    constructor(public readonly promotionService: PromotionService,
                private readonly snackBar: MatSnackBar,
                private dialogBoxService: DialogBoxService) {
    }

    ngOnInit(): void {
    }

    public editPromotion(id: string): void {
        this.promotionService.setPromotionById(id);
    }

    public toggleActive(id: string): void {
        this.promotionService.toggleActive(id);
    }

    public deletePromotion(id: string): void {
        this.dialogBoxService.openDialogBox('Delete Promotion', 'Are you sure you want to perform this action?')
            .afterClosed().subscribe(
            dialogResponse => {
                if (dialogResponse == true) {
                    this.promotionService.deletePromotion(id).then(() => {
                        // Display success message, if the promotion was successfully deleted
                        this.promotionService.getPromotionById(id).pipe(
                            tap(promotion => {
                                this.openSnackBar(promotion.name + ' Promo', 'Deleted');
                            })).subscribe().unsubscribe(); // This does not feel right
                    }).catch((reason) => {
                        // Display error message
                        console.warn(reason);
                        this.promotionService.getPromotionById(id).pipe(
                            tap(promotion => {
                                alert('Error Posting ' + promotion.name + '.' + ' Try again or contact your Admin');
                            })
                        ).subscribe().unsubscribe(); // This does not feel right
                    });
                }
            });
    }


    private openSnackBar(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
