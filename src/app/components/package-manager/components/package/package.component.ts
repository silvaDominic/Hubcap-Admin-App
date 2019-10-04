import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PackageService} from '../../../../_shared/services/package.service';
import {Package} from '../../../../_shared/models/package.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {Observable} from 'rxjs';
import {PackageOptionsComponent} from '../package-options/package-options.component';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {

    @Output() packageSelect = new EventEmitter<number>();
    @Input() selectedPackageType: SERVICE_TYPE;

    constructor(private packageService: PackageService) {
    }

    ngOnInit() {
        console.log('package init');
    }

    callSetFocusPackage(index: number) {
        this.packageService.creatingNewPackage = false;
        this.packageSelect.emit(index);
    }
}
