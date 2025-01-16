import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Location } from '@angular/common';
import { GQLConfig } from '../../graphql.operations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { lawyerRatingModel } from '../../common/advocate.model';

@Component({
  selector: 'app-advocate-rating',
  templateUrl: './advocate-rating.component.html',
  styleUrl: './advocate-rating.component.scss'
})
export class AdvocateRatingComponent {
  lawyerId: any;
  isRatingAdd: boolean = false;
  lawyer: any = '';
  ratingList: any = [];
  lawyerRatingForm: FormGroup

  constructor(private _router: Router, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private location: Location, private fb: FormBuilder) {
    this.lawyerId = this._router.getCurrentNavigation()?.extras.state;
    if (this.lawyerId != undefined) {
      this.getLawyerRating();
    }
    else {
      this.location.back();
    }
    this.lawyerRatingForm = this.fb.group(new lawyerRatingModel)
  }

  onClick(parameter: string, e: any): void {
    this.lawyerRatingForm.get(parameter)?.setValue(e);
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

  addReviews() {
    const userData = JSON.parse(sessionStorage.getItem('userData')!)
    const data = {
      lawyerId: this.lawyerId,
      userId: userData._id,
      legalKnowledge: parseFloat(this.lawyerRatingForm.value.legalKnowledge.rating),
      legalAnalysis: parseFloat(this.lawyerRatingForm.value.legalAnalysis.rating),
      communicationSkills: parseFloat(this.lawyerRatingForm.value.communicationSkills.rating),
      enP: parseFloat(this.lawyerRatingForm.value.enP.rating),
    }
    this._apolloService.mutate(GQLConfig.createLawyerRating, data).subscribe(res => {
      if (res.data != null) {
        if (res.data.createLawyerRating.status == 200) {
          this._toastMessage.success(res.data.createLawyerRating.message);
          this.getLawyerRating();
        }
        else {
          this._toastMessage.success(res.data.createLawyerRating.message);
        }
      }
    });
  }
}
