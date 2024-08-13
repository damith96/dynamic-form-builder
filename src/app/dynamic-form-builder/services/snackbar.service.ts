import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    constructor (
        private snackBar: MatSnackBar,
    ) { }

    public open(message: string, duration: number = 2500): void {
        const config: MatSnackBarConfig = {
            duration,
        };

        this.snackBar.open(message, 'Close', config);
    }
}
