import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_core/services/auth-guard.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthComponent} from './components/auth/auth.component';
import {AdminLayoutComponent} from './_layouts/admin-layout/admin-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: '404',
        component: PageNotFoundComponent,
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canLoad: [AuthGuard],
        loadChildren: () => import('./_layouts/admin-layout/admin-layout.module').then(mod => mod.AdminLayoutModule)
    },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
