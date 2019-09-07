import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import {CoreModule} from './_core/core.module';
import {AuthModule} from './components/auth/auth.module';
import {RouterModule} from '@angular/router';
import {BaseLayoutModule} from './_layouts/base-layout/base-layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
        AdminLayoutComponent,
        PageNotFoundComponent
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
