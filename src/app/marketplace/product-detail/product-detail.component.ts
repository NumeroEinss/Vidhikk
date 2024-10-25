import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  routerState: any;
  productdetail: any;
  isDescriptionOpened: boolean = true;
  isReviewOpened: boolean = false;
  showReviewForm: boolean = false;
  currentIndex: number = 0;
  productMultipleImages: string[] = [];
  reviews: string = '';

  reviewList = [
    {
      profileImage: '../../assets/images/image/person.jpg',
      name: 'Anil Soni',
      postTime: '1 days ago',
      review: 'A top criminal defense and personal injury lawyer who knows how to fight smart and strategically to get the best possible results. A top criminal defense and personal injury lawyer who knows how to fight smart and strategically to get the best possible results.'
    },
    {
      profileImage: '../../assets/images/image/person.jpg',
      name: 'Anjali Soni',
      postTime: '1 days ago',
      review: 'A top defense and personal injury lawyer who knows how to fight smart and strategically to get the best possible results.'
    }
  ];


  constructor(private router: Router, private location: Location, private route: ActivatedRoute) {
    this.routerState = this.router.getCurrentNavigation()?.extras.state;

    if (this.routerState == undefined) {
      this.routeBack();
    }
    else {
      this.getProductDetail()
    }

    this.productMultipleImages = this.routerState.multipleImages
  }

  routeBack() {
    this.location.back();
  }

  getProductDetail() { }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex < this.productMultipleImages.length - 1) {
      this.currentIndex++;
    }
  }

  get currentImage() {
    return this.productMultipleImages[this.currentIndex];
  }

  get imageNumbering() {
    return `${this.currentIndex + 1}/${this.productMultipleImages.length}`;
  }

  get isNextDisabled() {
    return this.currentIndex >= this.productMultipleImages.length - 1;
  }

  get isPrevDisabled() {
    return this.currentIndex <= 0;
  }

  toggleDescription() {
    this.isDescriptionOpened = true;
    this.isReviewOpened = false;
  }

  toggleReview() {
    this.isReviewOpened = true;
    this.isDescriptionOpened = false;
  }

  reviewForm() {
    this.showReviewForm = true;
  }

  submitReview(reviews: string) {
    console.log("reviews", reviews)
    this.reviews = '';
  }

  redirectToSellerProfile(sellerDetail:any){
    this.router.navigate(['/lawyer/marketplace/sellerProfile'], {state: sellerDetail});
    console.log('sellerDetail',sellerDetail)
  }

}
