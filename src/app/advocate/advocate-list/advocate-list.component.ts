import { Component, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { GraphQLModule, imageUrl } from '../../graphql.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advocate-list',
  templateUrl: './advocate-list.component.html',
  styleUrl: './advocate-list.component.scss'
})
export class AdvocateListComponent {

  advocateTypeList: any = [
    { value: 'all', viewValue: "All Advocates" },
    { value: 'civil', viewValue: "Civil Advocate" },
    { value: 'taxation', viewValue: "Taxation Advocate" }
  ];
  selectedAdvocateType: string = "all";

  popularLawyerList: any = [
    {
      image: '../../../assets/images/image/lawyer_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    },
    {
      image: '../../../assets/images/image/advocate_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    },
    {
      image: '../../../assets/images/image/lawyer_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    },
    {
      image: '../../../assets/images/image/advocate_4.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    },
    {
      image: '../../../assets/images/image/lawyer_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    }
  ];
  lawyerList: any = [];

  filteredLawyerList: any = [];

  places: any = [];

  practiseField: any = [];

  constructor(private _router: Router, private _apollo: ApolloService, private _toastMessage: ToastMessageService,
    private _http: HttpClient) {
    this.getAdvocateList();
    this.getCityList();
    this.getPractiscingField();
  }

  viewLawyerDetails(lawyerId: any) {
    const extras = lawyerId;
    this._router.navigate([`/user/advocates/view`], { state: extras });
  }

  viewRating(lawyerId: any) {
    const extras = lawyerId;
    this._router.navigate([`/user/advocates/view/advocate-rating`], { state: extras });
  }

  getAdvocateList() {
    this._apollo.mutate(GQLConfig.getAdvocateList).subscribe(data => {
      if (data.data != null) {
        if (data.data.getLawyerList.status == 200) {
          this._toastMessage.message(data.data.getLawyerList.message);
          this.lawyerList = data.data.getLawyerList.data.lawyerList;
          this.filteredLawyerList = this.lawyerList;
        }
        else {
          this._toastMessage.error(data.data.getLawyerList.message);
        }
      }
    })
  }

  getImageUrl(profileImage: any): String {
    if (profileImage !== "") {
      return imageUrl() + profileImage;
    }
    else {
      return profileImage;
    }
  }

  getCityList() {
    this._http.get('assets/JSON/cities.json').subscribe({
      next: (data) => {
        this.places = data;
      },
      error: (error) => { this._toastMessage.error(error) }
    })
  }

  getPractiscingField() {
    this._http.get('assets/JSON/practiscing_field.json').subscribe({
      next: (data) => {
        this.practiseField = data;
      },
      error: (error) => { this._toastMessage.error(error) }
    })
  }

  getShortInfo(info: string) {
    return info.slice(0, 15);
  }

  filterLawyers(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredLawyerList = this.lawyerList.filter((key: any) =>
      key.city.toLowerCase().startsWith(filter)
    );
  }
}
