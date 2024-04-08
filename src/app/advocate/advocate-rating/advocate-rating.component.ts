import { Component } from '@angular/core';

@Component({
  selector: 'app-advocate-rating',
  templateUrl: './advocate-rating.component.html',
  styleUrl: './advocate-rating.component.scss'
})
export class AdvocateRatingComponent {
  isRatingAdd: boolean= false;

  reviews = [
    {
      image: '../../../assets/images/image/advocate_3.jpg',
      name: 'Kapil Sibbal',
      lawyerType: 'Criminal Lawyer',
      rating: 4.0,
      ratingCount: 23
    }
  ];

  ratingList = [
    {
      image: '../../../assets/images/image/add_member.png',
      name: 'Anil Soni',
      ratingCount: 3.0,
      days:'2 days ago'
    },
    {
      image: '../../../assets/images/image/add_member2.png',
      name: 'Devansh Jain',
      ratingCount: 3.0,
      days:'1 days ago'
    },
    {
      image: '../../../assets/images/image/add_member.png',
      name: 'Anil Soni',
      ratingCount: 3.0,
      days:'2 days ago'
    },
    {
      image: '../../../assets/images/image/add_member2.png',
      name: 'Devansh Jain',
      ratingCount: 3.0,
      days:'1 days ago'
    },
  ];

  addReviews(){
    const rating = {
      image: '../../../assets/images/image/add_member.png',
      name: 'Devansh Jain',
      ratingCount: 3.0,
      days:'Today'
    }

    this.ratingList.unshift(rating)
  }
}
