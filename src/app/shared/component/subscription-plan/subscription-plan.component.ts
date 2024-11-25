import { Component, Input } from '@angular/core';
import { ToastMessageService } from '../../services/snack-alert.service';
import { ApolloService } from '../../services/apollo.service';
import { GQLConfig } from '../../../graphql.operations';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrl: './subscription-plan.component.scss'
})
export class SubscriptionPlanComponent {
  @Input() toggleId: string = "";
  planList: any = [];
  userType: string;

  sellerPlans = [
    {
      productQuantity:'2',
      planPrice:'0',
      currentlyActive:true,
      features:[
        {
          isAvailable:true,
          featureHeading:'feature 1',
        },
        {
          isAvailable:false,
          featureHeading:'feature 2',
        },
        {
          isAvailable:false,
          featureHeading:'feature 3',
        },
        {
          isAvailable:false,
          featureHeading:'feature 3',
        },
      ]
    },
    {
      productQuantity:'10',
      planPrice:'1000',
      currentlyActive:false,
      features:[
        {
          isAvailable:true,
          featureHeading:'feature 1',
        },
        {
          isAvailable:true,
          featureHeading:'feature 2',
        },
        {
          isAvailable:false,
          featureHeading:'feature 3',
        },
        {
          isAvailable:false,
          featureHeading:'feature 3',
        },
      ]  
    },
    {
      productQuantity:'25',
      planPrice:'2250', 
      currentlyActive:false,
      features:[
        {
          isAvailable:true,
          featureHeading:'feature 1',
        },
        {
          isAvailable:true,
          featureHeading:'feature 2',
        },
        {
          isAvailable:false,
          featureHeading:'feature 3',
        },
        {
          isAvailable:false,
          featureHeading:'feature 3',
        },
      ] 
    },
    {
      productQuantity:'50',
      planPrice:'4000',
      currentlyActive:false,
      features:[
        {
          isAvailable:true,
          featureHeading:'feature 1',
        },
        {
          isAvailable:true,
          featureHeading:'feature 2',
        },
        {
          isAvailable:true,
          featureHeading:'feature 3',
        },
        {
          isAvailable:false,
          featureHeading:'feature 3',
        },
      ]  
    }
  ]

  constructor(private _apolloService: ApolloService, private _toastMessage: ToastMessageService) {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    this.userType = userData.userType
    this.getPlanList();
    this.sellerPlanList();
  }

  getPlanList() {
    this._apolloService.mutate(GQLConfig.getPlanList).subscribe(objRes => {
      if (objRes.data != null) {
        console.log(objRes, 'Response')
        if (objRes.data.planList.status == 200) {
          this.planList = objRes.data.planList.data.plans;
        }
      }
    })
  }

  sellerPlanList() {

  }
}
