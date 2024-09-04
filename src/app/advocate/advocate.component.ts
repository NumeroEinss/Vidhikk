import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GQLConfig } from '../graphql.operations';
import { ApolloService } from '../shared/services/apollo.service';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { Location } from '@angular/common';
import { imageUrl } from '../graphql.module';

@Component({
  selector: 'app-advocate',
  templateUrl: './advocate.component.html',
  styleUrl: './advocate.component.scss'
})
export class AdvocateComponent {

  lawyer: any = {};
  lawyerId: any;
  isNameVisible: boolean = false;
  activeRoute: string = "";

  constructor(private _router: Router, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private location: Location) {
    this.lawyerId = this._router.getCurrentNavigation()?.extras.state;
    if (this.lawyerId != undefined) {
      this.activeRoute = this._router.url;
      this.getLawyerDetail();
    }
    else {
      this.location.back();
    }
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
}
