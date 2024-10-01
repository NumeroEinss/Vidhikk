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

  constructor(private _apolloService: ApolloService, private _toastMessage: ToastMessageService) {
    this.getPlanList();
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
}
