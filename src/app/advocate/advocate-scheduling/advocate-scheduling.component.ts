import { AfterViewInit, Component } from '@angular/core';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advocate-scheduling',
  templateUrl: './advocate-scheduling.component.html',
  styleUrl: './advocate-scheduling.component.scss'
})
export class AdvocateSchedulingComponent implements AfterViewInit {
  isNameVisible: boolean = false;
  qrData: string = "Payment For Advocate Scheduling";
  availabilityList: any;
  qrAmount: number = 200;

  transactionId: any = "";
  lawyerId: any = "";

  constructor(private _apolloService: ApolloService, private _toastMessage: ToastMessageService, private _router: Router) {
    this.lawyerId = this._router.getCurrentNavigation()?.extras.state;
  }

  ngAfterViewInit() {
    this.getAvailabilityList();
    this.getQrData();
  }

  getAvailabilityList() {
    this._apolloService.mutate(GQLConfig.getAvailabilityList, { lawyerId: this.lawyerId }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.getAvailabilityList.status == 200) {
          this.availabilityList = data.data.getAvailabilityList.data.availabilities;
        }
        else {
          this._toastMessage.error(data.data.getAvailabilityList.message);
        }
      }
    });
  }


  getQrData() {
    this._apolloService.post('/payment/make-payment', { amount: this.qrAmount.toString() + '.00' }).subscribe(objRes => {
      if (objRes != null) {
        if (objRes.status == 'success') {
          this.qrData = objRes.data.url;
          this.transactionId = objRes.data.transactionId;
        }
      }
    })
  }
}
