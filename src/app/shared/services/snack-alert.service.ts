import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {

  public showLoader: boolean = false;

  constructor(private MatSnackBar: MatSnackBar) { }

  success(message: string, duration = 3500) {
    this.MatSnackBar.open(message, '', {
      duration,
      panelClass: 'success',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  error(message: string, duration = 3500) {
    this.MatSnackBar.open(message, '', {
      duration,
      panelClass: 'error',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  message(message: string, duration = 3500) {
    this.MatSnackBar.open(message, '', {
      duration,
      panelClass: 'success',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showMessage(title: string, message: string) {
    this.MatSnackBar.open(`${title}: ${message}`, 'Close', {
      duration: 10000,
    });
  }
}
