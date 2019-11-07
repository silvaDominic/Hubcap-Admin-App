import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogBoxComponent} from '../components/dialog-box/dialog-box.component';

@Injectable({
    providedIn: 'root'
})
export class DialogBoxService {
    constructor(private readonly dialogBox: MatDialog) {
    }

    openDialogBox(title: string, dialog: string) {
        return this.dialogBox.open(DialogBoxComponent, {
            data: {
                title: title,
                dialog: dialog
            }
        });
    }
}
