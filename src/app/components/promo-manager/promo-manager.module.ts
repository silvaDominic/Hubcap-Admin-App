import {NgModule} from '@angular/core';
import {SharedModule} from '../../_shared/shared.module';
import {PromoManagerComponent} from './promo-manager.component';
import {PromoComponent} from './components/promo/promo.component';
import {PromoHistoryComponent} from './components/promo-history/promo-history.component';
import {PromoFormComponent} from './components/promo-form/promo-form.component';
import {PromoManagerRoutingModule} from './promo-manager.routing';
import {PromoOverviewComponent} from './components/promo-overview/promo-overview.component';

@NgModule({
    imports: [
        SharedModule,
        PromoManagerRoutingModule
    ],
    declarations: [
        PromoManagerComponent,
        PromoComponent,
        PromoHistoryComponent,
        PromoFormComponent,
        PromoOverviewComponent
    ]
})

export class PromoManagerModule {}
