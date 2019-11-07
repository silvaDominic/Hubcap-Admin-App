import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-box',
    templateUrl: './dialog-box.component.html',
    styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogBoxComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    closeDialog() {
        this.dialogRef.close(false);
    }
}
