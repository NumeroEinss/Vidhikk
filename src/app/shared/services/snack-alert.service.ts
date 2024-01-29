import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackAlertService {

  constructor(private MatSnackBar: MatSnackBar) {

  }


  success(message: string, duration = 3500) {
    this.MatSnackBar.open(message, '', { duration, panelClass: ['alert', 'alert-success'] })
  }


  error(message: string, duration = 3500) {
    this.MatSnackBar.open(message, '', { duration, panelClass: ['alert', 'alert-error'] })
  }

  message(message: string, duration = 3500) {
    this.MatSnackBar.open(message, '', { duration, panelClass: 'alert' })

  }

}
