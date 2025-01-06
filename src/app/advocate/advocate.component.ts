import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GQLConfig } from '../graphql.operations';
import { ApolloService } from '../shared/services/apollo.service';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { Location } from '@angular/common';
import { imageUrl } from '../graphql.module';
import { PaaymentService } from '../shared/services/paayment.service';

@Component({
  selector: 'app-advocate',
  templateUrl: './advocate.component.html',
  styleUrl: './advocate.component.scss'
})
export class AdvocateComponent {

  lawyer: any = {};
  lawyerDetail: any;
  lawyerId: any;
  isNameVisible: boolean = false;
  activeRoute: string = "";
  qrData: string = "Payment For Hiring Advocate";
  transactionId: any = "";
  qrAmount: number = 500;
  responseData: any = {
    clientName: '',
    transactionId: '',
    date: ''
  }

  constructor(private _router: Router, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private location: Location, private paymentService: PaaymentService) {
    this.lawyerId = this._router.getCurrentNavigation()?.extras.state;
    if (this.lawyerId != undefined) {
      this.activeRoute = this._router.url;
      this.getLawyerDetail();
    }
    else {
      this.location.back();
    }
  }

  getQrData() {
    this._apolloService.post('/payment/make-payment', { amount: this.qrAmount.toString() + '.00' }).subscribe(objRes => {
      if (objRes != null) {
        if (objRes.status == 'success') {
          this.qrData = objRes.data.url;
          this.transactionId = objRes.data.transactionId;
          let btn = document.getElementById('qrModalTrigger') as HTMLElement;
          btn.click();
          this.getPayentStatus();
        }
      }
    })
  }

  viewRating() {
    const extras = this.lawyer._id;
    this._router.navigate([`/user/advocates/view/advocate-rating`], { state: extras });
  }

  getLawyerDetail() {
    this._apolloService.mutate(GQLConfig.getLawyerDetail, { lawyerId: this.lawyerId }).subscribe(data => {
      if (data.data != null) {
        if (data.data.lawyerProfile.status == 200) {
          this._toastMessage.success(data.data.lawyerProfile.message);
          this.lawyer = data.data.lawyerProfile.data;
        }
        else {
          this._toastMessage.success(data.data.lawyerProfile.message);
        }
      }
    })
  }

  getImage(image: any) {
    return imageUrl() + image;
  }

  showDetails() {
    this.isNameVisible = true;
  }

  navigateToAdvocateSchedule() {
    const extras = this.lawyer._id;
    this._router.navigate([`${this.activeRoute}/hire`], { state: extras });
    console.log(this.activeRoute + 'hire', '----------', extras)
  }

  getPayentStatus() {
    setTimeout(() => {
      this.paymentService.pollTransactionStatus(this.transactionId).subscribe({
        next: (success: any) => {
          console.log(success, 'Success from Comp')
          if (success.status == true) {
            this.isNameVisible = true;
            this.responseData = {
              clientName: this.lawyer?.lawyerName,
              transactionId: this.transactionId,
              date: success.date
            }
            console.log('Payment Success');
            let el = document.getElementById('paymentConfirm') as HTMLElement;
            el.click();
          }
          else if (success.status == false) {
            this._toastMessage.error("Transaction Session Expired !!");
            this._toastMessage.error('Session Expired')
            let el = document.getElementById('closeQrModal') as HTMLElement;
            el.click();
          }
        },
        error: (error) => {
          console.log(error, 'Error')
          console.error('Error during payment process', error);
          alert('Something went wrong. Please try again.');
        }
      });
    }, 500)
  }
}
