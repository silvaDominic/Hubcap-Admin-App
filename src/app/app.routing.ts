import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './_layouts/admin-layout/admin-layout.component';
import {AuthGuard} from './_core/services/auth-guard.service';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [

    {
        path: '',
        component: AdminLayoutComponent,
        // canLoad: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./_layouts/admin-layout/admin-layout.module').then(mod => mod.AdminLayoutModule)
            }]
    },
/*    {
        path: '**', component: PageNotFoundComponent
    }*/
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
