import { Injectable } from '@angular/core';
import { ToastMessageService } from './snack-alert.service';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private _toastMessage: ToastMessageService) { }

  sendEmail(emailParams: any) {
    emailjs.send('service_jpaevqv', 'template_261v2xe', emailParams, 'ISEmtZJjIxgGELu9n')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        this._toastMessage.success("Email sent successfully!");
      }, (err) => {
        console.error('FAILED...', err);
        this._toastMessage.error("Failed to send email.");
      });
  }
}
