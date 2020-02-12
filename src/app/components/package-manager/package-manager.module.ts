import {NgModule} from '@angular/core';
import {SharedModule} from '../../_shared/shared.module';
import {PackageManagerComponent} from './package-manager.component';
import {PackageComponent} from './components/package/package.component';
import {PackageOptionsComponent} from './components/package-options/package-options.component';
import {PackageManagerRoutingModule} from './package-manager.routing';

@NgModule({
    imports: [
        SharedModule,
        PackageManagerRoutingModule
    ],
    declarations: [
        PackageManagerComponent,
        PackageComponent,
        PackageOptionsComponent
    ]
})

export class PackageManagerModule {}
