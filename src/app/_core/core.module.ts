import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from './services/api.service';
import {JwtService} from './services/jwt.service';
import {UserService} from './services/user.service';
import {RoleGuard} from './services/role-guared.service';
import {AuthGuard} from './services/auth-guard.service';
import {HttpTokenInterceptor} from './http.token.intercepter';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CarwashService} from '../_shared/services/carwash.service';


@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        ApiService,
        AuthGuard,
        RoleGuard,
        JwtService,
        UserService,
        CarwashService
    ],
    declarations: []
})
export class CoreModule { }
