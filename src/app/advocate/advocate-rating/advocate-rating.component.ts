import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Location } from '@angular/common';
import { GQLConfig } from '../../graphql.operations';

@Component({
  selector: 'app-advocate-rating',
  templateUrl: './advocate-rating.component.html',
  styleUrl: './advocate-rating.component.scss'
})
export class AdvocateRatingComponent {
  lawyerId: any;
  isRatingAdd: boolean = false;
  lawyer: any;

  ratingList: any = [
    // {
    //   image: '../../../assets/images/image/add_member.png',
    //   name: 'Anil Soni',
    //   ratingCount: 3.0,
    //   days: '2 days ago'
    // }
  ];

  constructor(private _router: Router, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private location: Location) {
    this.lawyerId = this._router.getCurrentNavigation()?.extras.state;
    if (this.lawyerId != undefined) {
      this.getLawyerRating();
    }
    else {
      this.location.back();
    }
  }

  addReviews() {
    const userData = JSON.parse(sessionStorage.getItem('userData')!)
    const rating = {
      image: '../../../assets/images/image/add_member.png',
      name: userData.name,
      ratingCount: 3.0,
      days: 'Today'
    }
    this.ratingList.unshift(rating)
  }

  getLawyerRating() {
    this._apolloService.mutate(GQLConfig.getLawyerRating, { lawyerId: this.lawyerId }).subscribe(data => {
      if (data.data != null) {
        if (data.data.getLawyerRatingList.status == 200) {
          this._toastMessage.success(data.data.getLawyerRatingList.message);
          this.lawyer = data.data.getLawyerRatingList.data;
          this.ratingList = data.data.getLawyerRatingList.data.lawyerRatingList;
        }
        else {
          this._toastMessage.success(data.data.getLawyerRatingList.message);
        }
      }
    })
  }
}
