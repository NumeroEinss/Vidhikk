import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastMessageService } from '../../services/snack-alert.service';
import { ApolloService } from '../../services/apollo.service';
import { GQLConfig } from '../../../graphql.operations';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Router } from '@angular/router';
import { PaaymentService } from '../../services/paayment.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrl: './subscription-plan.component.scss'
})
export class SubscriptionPlanComponent {
  @Input() toggleId: string = "";
  @Input() transactionId: string = "";
  @Input() closeModalId: string = "";
  @Output() clicked: EventEmitter<number> = new EventEmitter();
  planList: any = [];
  userType: string;
  activePlan: string = "";
  transactionCompleted: boolean = false;
  sellerPlans: any = [
    // {
    //   productQuantity: '2',
    //   planPrice: '0',
    //   currentlyActive: true,
    //   features: [
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 1',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 2',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 3',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 3',
    //     },
    //   ]
    // },
    // {
    //   productQuantity: '10',
    //   planPrice: '1000',
    //   currentlyActive: false,
    //   features: [
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 1',
    //     },
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 2',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 3',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 3',
    //     },
    //   ]
    // },
    // {
    //   productQuantity: '25',
    //   planPrice: '2250',
    //   currentlyActive: false,
    //   features: [
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 1',
    //     },
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 2',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 3',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 3',
    //     },
    //   ]
    // },
    // {
    //   productQuantity: '50',
    //   planPrice: '4000',
    //   currentlyActive: false,
    //   features: [
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 1',
    //     },
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 2',
    //     },
    //     {
    //       isAvailable: true,
    //       featureHeading: 'feature 3',
    //     },
    //     {
    //       isAvailable: false,
    //       featureHeading: 'feature 3',
    //     },
    //   ]
    // }
  ];
  loading: boolean = false;

  constructor(private _apolloService: ApolloService, private _toastMessage: ToastMessageService, public _authService: AuthService, private _subscriptionService: SubscriptionService,
    private _router: Router, private paymentService: PaaymentService) {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    this.userType = userData.userType
    this.getPlanList();
    this.sellerPlanList();
    this.activePlan = userData.activePlan;
  }

  getPlanList() {
    this._apolloService.mutate(GQLConfig.getPlanList, { planType: 'LAWYER' }).subscribe(objRes => {
      if (objRes.data != null) {
        if (objRes.data.planList.status == 200) {
          this.planList = objRes.data.planList.data.plans;
        }
      }
    })
  }

  sellerPlanList() {
    this._apolloService.mutate(GQLConfig.getPlanList, { planType: 'SELLER' }).subscribe(objRes => {
      if (objRes.data != null) {
        if (objRes.data.planList.status == 200) {
          this.sellerPlans = objRes.data.planList.data.plans;
        }
      }
    })
  }

  choosePlan(plan: any) {
    // console.log("Choose Plan Triggered !!");
    console.log(plan, 'Selected Plan')
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    if (userData.userType === 'LAWYER') {
      let reqObj = {
        lawyerId: userData._id,
        activePlan: plan.planHeading
      }
      this._apolloService.mutate(GQLConfig.choosePlan, reqObj).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.lawyerPurchasedPlan.status == 200) {
            this._toastMessage.success("Plan Subscribed Successfully");
            userData['activePlan'] = objRes.data.lawyerPurchasedPlan.data.planHeading;
            this.activePlan = userData['activePlan'];
            sessionStorage.setItem('userData', JSON.stringify(userData));
            this._authService.currentUserSubject.next(userData);
            this._subscriptionService.getSubscriptionDetails();
            this._router.navigate([this._router.url.split('/')[1] + '/activity-feed']);
            // this._authService.logout();
          }
          else {
            this._toastMessage.error(objRes.data.lawyerPurchasedPlan.message);
          }
        }
      })
    }
    else if (userData.userType === 'SELLER') {
      let reqObj = {
        sellerId: userData._id,
        activePlan: plan.planHeading
      }
      this._apolloService.mutate(GQLConfig.sellerChoosePlan, reqObj).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.sellerPurchasedPlan.status == 200) {
            this._toastMessage.success("Plan Subscribed Successfully");
            userData['activePlan'] = objRes.data.sellerPurchasedPlan.data.planHeading;
            this.activePlan = userData['activePlan'];
            sessionStorage.setItem('userData', JSON.stringify(userData));
            this._authService.currentUserSubject.next(userData);
            this._subscriptionService.getSubscriptionDetails();
            this._router.navigate(['/seller/user-profile']);
            // this._authService.logout();
          }
          else {
            this._toastMessage.error(objRes.data.sellerPurchasedPlan.message);
          }
        }
      })
    }
  }

  getPayentStatus(plan: any) {
    this.clicked.emit(plan.planPrice);
    setTimeout(() => {
      this.paymentService.pollTransactionStatus(this.transactionId).subscribe({
        next: (success) => {
          console.log(success, 'Success from Comp')
          if (success == true) {
            this.transactionCompleted = true;
            this.loading = false;
            this.choosePlan(plan);
            let el = document.getElementById(this.closeModalId) as HTMLElement;
            el.click();
          }
          else if (success == false) {
            this._toastMessage.error("Transaction Session Expired !!");
            let el = document.getElementById(this.closeModalId) as HTMLElement;
            el.click();
          }
        },
        error: (error) => {
          console.log(error, 'Error')
          this.loading = false;
          console.error('Error during payment process', error);
          alert('Something went wrong. Please try again.');
        }
      });
    }, 500)
  }

  setFreePlan(plan: any) {
    this.transactionCompleted = true;
    this.loading = false;
    this.choosePlan(plan);
    let el = document.getElementById(this.closeModalId) as HTMLElement;
    el.click();
  }
}
