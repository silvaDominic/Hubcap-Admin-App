import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_core/services/auth-guard.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthComponent} from './components/auth/auth.component';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: '404',
        component: PageNotFoundComponent,
    }
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
