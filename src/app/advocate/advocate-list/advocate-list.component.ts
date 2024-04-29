import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    {
      image: '../../../assets/images/image/advocate_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    },
    {
      image: '../../../assets/images/image/advocate_4.jpg',
      location: 'Indore ,M.P.',
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
      image: '../../../assets/images/image/advocate_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    },
    {
      image: '../../../assets/images/image/advocate_4.jpg',
      location: 'Indore ,M.P.',
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
      image: '../../../assets/images/image/advocate_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    },
    {
      image: '../../../assets/images/image/advocate_4.jpg',
      location: 'Indore ,M.P.',
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
      image: '../../../assets/images/image/advocate_3.jpg',
      location: 'Bhopal ,M.P.',
      type: 'Criminal Lawyer',
      experience: '9+ Experience',
      rating: 4
    }
  ];

  constructor(private _router: Router) { }

  viewLawyerDetails() {
    this._router.navigate(['/user/advocates/dflkasdksdfasde']);
  }

  viewRating(){
    this._router.navigate(['/user/advocates/gfdyfvayfd/advocate-rating'])
  }
}
