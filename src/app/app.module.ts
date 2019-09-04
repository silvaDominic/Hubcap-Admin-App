import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import {AdminLayoutModule} from './_layouts/admin-layout/admin-layout.module';
import {SharedModule} from './_shared/shared.module';
import {CoreModule} from './_core/core.module';
import {AuthModule} from './components/auth/auth.module';
import {AuthGuard} from './_core/services/auth-guard.service';
import {RouterModule} from '@angular/router';
import {BaseLayoutModule} from './_layouts/base-layout/base-layout.module';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './_core/services/user.service';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BaseLayoutModule,
        RouterModule,
        AppRoutingModule,
        CoreModule,
        AuthModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
