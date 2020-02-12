import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreManagerComponent} from './store-manager.component';

const routes: Routes = [
    {
        path: '',
        component: StoreManagerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StoreManagerRoutingModule {}
