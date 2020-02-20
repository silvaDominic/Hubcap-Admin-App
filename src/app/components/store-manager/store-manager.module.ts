import {NgModule} from '@angular/core';
import {SharedModule} from '../../_shared/shared.module';
import {StoreManagerComponent} from './store-manager.component';
import {StoreFormComponent} from './components/store-form/store-form.component';
import {StoreManagerRoutingModule} from './store-manager.routing';
import {ExceptionsManagerComponent} from './components/exceptions-manager/exceptions-manager.component';
import {ExceptionComponent} from './components/exceptions-manager/exception/exception.component';
import {ExceptionFormComponent} from './components/exceptions-manager/exception-form/exception-form.component';

@NgModule({
    imports: [
        SharedModule,
        StoreManagerRoutingModule
    ],
    declarations: [
        StoreManagerComponent,
        StoreFormComponent,
        ExceptionsManagerComponent,
        ExceptionComponent,
        ExceptionFormComponent
    ]
})

export class StoreManagerModule {}
