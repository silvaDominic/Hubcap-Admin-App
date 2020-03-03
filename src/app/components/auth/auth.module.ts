import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { AuthRoutingModule } from './auth.routing';
import {SharedModule} from '../../_shared/shared.module';
import {RegisterComponent} from './register/register.component';

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    providers: [NoAuthGuard]
})
export class AuthModule {}
