import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import {CoreModule} from './_core/core.module';
import {AuthModule} from './components/auth/auth.module';
import {RouterModule} from '@angular/router';
import {BaseLayoutModule} from './_layouts/base-layout/base-layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {DialogBoxComponent} from './_shared/components/dialog-box/dialog-box.component';
import {SharedModule} from './_shared/shared.module';
import {AdminLayoutComponent} from './_layouts/admin-layout/admin-layout.component';
import {AuthGuard} from './_core/services/auth-guard.service';
import {RoleGuard} from './_core/services/role-guard.service';

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
        AuthModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        AdminLayoutComponent
    ],
    exports: [],
    providers: [],
    entryComponents: [DialogBoxComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
