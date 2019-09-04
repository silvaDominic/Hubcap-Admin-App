import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { AuthRoutingModule } from './auth.routing';
import {SharedModule} from '../../_shared/shared.module';

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule
    ],
    declarations: [
        AuthComponent
    ],
    providers: [
        NoAuthGuard
    ]
})
export class AuthModule {}
