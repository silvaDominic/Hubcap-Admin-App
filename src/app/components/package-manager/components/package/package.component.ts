import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PackageService} from '../../../../_shared/services/package.service';
import {Package} from '../../../../_shared/models/package.model';
import {SERVICE_TYPE} from '../../../../_shared/enums/SERVICE_TYPE';
import {Observable} from 'rxjs';
import {PackageOptionsComponent} from '../package-options/package-options.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {tap} from 'rxjs/operators';
import {DialogBoxService} from '../../../../_shared/services/dialog-box.service';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})

export class PackageComponent implements OnInit {

    @Output() packageSelect = new EventEmitter<number>();

    constructor(private readonly packageService: PackageService, private readonly snackBar: MatSnackBar, private readonly dialogBoxService: DialogBoxService) {
    }

    ngOnInit() {
        console.log('package init');
    }

    callSetFocusPackage(index: number) {
        this.packageService.creatingNewPackage = false;
        this.packageSelect.emit(index);
    }

    public savePackage(updatedPackage: Package): void {
        this.packageService.savePackage(updatedPackage).then((result) => {
            if (result == true) {
                this.openSnackBar(updatedPackage.name + ' Promo', 'Created')
                // Otherwise, display alert
            } else if (result == false) {
                alert('Error SAVING ' + updatedPackage.name + '.' + ' Try again or contact your Admin.')
            }
        });
    }

    public savePackageArray(updatedPackageArray: Package[]): void {
        const currentServiceType = this.packageService.getCurrentPackageType()

        this.packageService.savePackageArray(updatedPackageArray, currentServiceType).then((result) => {
            if (result == true) {
                this.openSnackBar(currentServiceType + ' Packages', 'Updated')
                // Otherwise, display alert
            } else if (result == false) {
                alert('Error SAVING ' + currentServiceType + ' packages.' + ' Try again or contact your Admin.')
            }
        });
    }

    public deletePackage(id: string): void {
        this.dialogBoxService.openDialogBox('Delete Package', 'Are you sure you want to perform this action?')
            .afterClosed().subscribe(
            dialogResponse => {
                if (dialogResponse == true) {
                    this.packageService.deletePackage(id, this.packageService.getCurrentPackageType()).then(() => {
                        // Display success message, if the Package was successfully deleted
                        this.packageService.getPackageById(id).pipe(
                            tap(_package => {
                                this.openSnackBar(_package.name + ' Package', 'Deleted');
                            })).subscribe().unsubscribe(); // This does not feel right
                    }).catch((reason) => {
                        // Display error message
                        console.warn(reason);
                        this.packageService.getPackageById(id).pipe(
                            tap(_package => {
                                alert('Error DELETING ' + _package.name + ' package.' + ' Try again or contact your Admin');
                            })
                        ).subscribe().unsubscribe(); // This does not feel right
                    });
                }
            });
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }
}
