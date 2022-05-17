import { Injectable, NgZone } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar, private zone: NgZone) {}

  public openSnackBar(errorText: string): void {
    this.zone.run(() => {
      const snackBar = this.snackBar.open(errorText, 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      snackBar.onAction().subscribe(() => {
        snackBar.dismiss();
      });
    });
  }
}
