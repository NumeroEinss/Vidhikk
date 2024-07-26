import { Component, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { GraphQLModule, imageUrl } from '../../graphql.module';

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
  allLawyerList: any = [
    // {
    //   image: '../../../assets/images/image/advocate_3.jpg',
    //   location: 'Bhopal ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/advocate_4.jpg',
    //   location: 'Indore ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/lawyer_3.jpg',
    //   location: 'Bhopal ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/advocate_3.jpg',
    //   location: 'Bhopal ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/advocate_4.jpg',
    //   location: 'Indore ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/lawyer_3.jpg',
    //   location: 'Bhopal ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/advocate_3.jpg',
    //   location: 'Bhopal ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/advocate_4.jpg',
    //   location: 'Indore ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/lawyer_3.jpg',
    //   location: 'Bhopal ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // },
    // {
    //   image: '../../../assets/images/image/advocate_3.jpg',
    //   location: 'Bhopal ,M.P.',
    //   type: 'Criminal Lawyer',
    //   experience: '9+ Experience',
    //   rating: 4
    // }
  ];

  places = [
    { value: 'indore', viewValue: 'Indore' },
    { value: 'bhopal', viewValue: 'Bhopal' },
    { value: 'mumbai', viewValue: 'Mumbai' },
  ];

  practiseField = [
    { value: 'civil', viewValue: 'Civil' },
    { value: 'finance', viewValue: 'Finance' },
    { value: 'civil', viewValue: 'Civil' },
  ];
  public url = inject(GraphQLModule);

  constructor(private _router: Router, private _apollo: ApolloService, private _toastMessage: ToastMessageService) {
    this.getAdvocateList();
  }

  viewLawyerDetails() {
    this._router.navigate(['/user/advocates/dflkasdksdfasde']);
  }

  viewRating() {
    this._router.navigate(['/user/advocates/gfdyfvayfd/advocate-rating'])
  }

  getAdvocateList() {
    this._apollo.mutate(GQLConfig.getAdvocateList).subscribe(data => {
      if (data.data != null) {
        if (data.data.getLawyerList.status == 200) {
          this._toastMessage.message(data.data.getLawyerList.message);
          this.allLawyerList = data.data.getLawyerList.data.lawyerList;
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
}
