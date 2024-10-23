import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-seller-product-profile',
  templateUrl: './seller-product-profile.component.html',
  styleUrl: './seller-product-profile.component.scss'
})
export class SellerProductProfileComponent {
  routerState: any;
  isListingShow: boolean = true;
  isReviewShow: boolean = false;
  showReviewForm: boolean = false;
  reviews: string = '';

  productsDetail = [
    {
      productId: '1',
      like: 'true',
      image: '../../assets/images/image/coat.png',
      multipleImages: ['../../assets/images/image/coat.png', '../../assets/images/image/coat.png'],
      productName: 'Advocates Coat and gown',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Sandeep Agal',
      sellerMobileNo: '9876543120',
      sellerEmail: 'sandeep@gmail.com',
      sellerAddress: 'Indore, M.P',
      sellerMemberShipfrom: 'Member since Apr 2015',
      disclaimer: 'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '1110 Rs'
    },
    {
      productId: '2',
      like: 'true',
      image: '../../assets/images/image/collar_band.png',
      multipleImages: ['../../assets/images/image/collar_band.png'],
      productName: 'Advocates Collar Band',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Saurabh Verma',
      sellerMobileNo: '9876543120',
      sellerEmail: 'saurabh@gmail.com',
      sellerAddress: 'Indore, M.P',
      sellerMemberShipfrom: 'Member since Apr 2015',
      disclaimer: 'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '190 Rs'
    },
    {
      productId: '3',
      like: 'false',
      image: '../../assets/images/image/breifcase.png',
      multipleImages: ['../../assets/images/image/breifcase.png', '../../assets/images/image/breifcase.png'],
      productName: 'Advocates Breifcase',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Preeti jain',
      sellerMobileNo: '9876543120',
      sellerEmail: 'preeti@gmail.com',
      sellerMemberShipfrom: 'Member since Apr 2015',
      disclaimer: 'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      sellerAddress: 'Indore, M.P',
      price: '4999 Rs'
    },
    {
      productId: '4',
      like: 'true',
      image: '../../assets/images/image/table.png',
      multipleImages: ['../../assets/images/image/table.png', '../../assets/images/image/table.png'],
      productName: 'Advocates table',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Sandeep Agal',
      sellerMobileNo: '9876543120',
      sellerEmail: 'sandeep@gmail.com',
      sellerAddress: 'Indore, M.P',
      sellerMemberShipfrom: 'Member since Apr 2015',
      disclaimer: 'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '1110 Rs'
    },
    {
      productId: '5',
      like: 'false',
      image: '../../assets/images/image/blazzer.png',
      multipleImages: ['../../assets/images/image/blazzer.png', '../../assets/images/image/blazzer.png'],
      productName: 'Advocates Blazzer',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Saurabh Verma',
      sellerMobileNo: '9876543120',
      sellerEmail: 'saurabh@gmail.com',
      sellerAddress: 'Indore, M.P',
      sellerMemberShipfrom: 'Member since Apr 2015',
      disclaimer: 'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '190 Rs'
    },
  ];

  reviewList = [
    {
      profileImage: '../../assets/images/image/person.jpg',
      name: 'Anil Soni',
      postTime: '1 days ago',
      review: 'A top criminal defense and personal injury lawyer who knows how to fight smart and strategically to get the best possible results. A top criminal defense and personal injury lawyer who knows how to fight smart and strategically to get the best possible results.'
    },
    {
      profileImage: '../../assets/images/image/person.jpg',
      name: 'Deepak Kumar',
      postTime: '3 days ago',
      review: 'A top defense and personal injury lawyer who knows how to fight smart and strategically to get the best possible results.'
    }
  ];

  constructor(private router: Router, private location: Location, private route: ActivatedRoute) {
    this.routerState = this.router.getCurrentNavigation()?.extras.state;

    if (this.routerState == undefined) {
      this.routeBack();
    }
    else {
      this.getSellerProductDetail()
    }
  }

  routeBack() {
    this.location.back();
  }

  getSellerProductDetail() { }

  toggleListing() {
    this.isReviewShow = false;
    this.isListingShow = true;
  }

  toggleReview() {
    this.isReviewShow = true;
    this.isListingShow = false;
  }

  reviewForm() {
    this.showReviewForm = true;
  }

  submitReview(reviews: string) {
    this.reviews = '';
  }
}
