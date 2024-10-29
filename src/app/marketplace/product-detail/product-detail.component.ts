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
  productMultipleImages: string[] = [];
  reviews: string = '';
  currentImageIndex: number = 0;
  currentImage: string;

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

    this.productMultipleImages = this.routerState.multipleImages;
    this.currentImage = this.productMultipleImages[this.currentImageIndex];
  }

  routeBack() {
    this.location.back();
  }

  getProductDetail() { }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.currentImage = this.productMultipleImages[this.currentImageIndex];
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.productMultipleImages.length - 1) {
      this.currentImageIndex++;
      this.currentImage = this.productMultipleImages[this.currentImageIndex];
    }
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
    this.currentImage = this.productMultipleImages[this.currentImageIndex];
  }


  get imageNumbering() {
    return `${this.currentImageIndex + 1}/${this.productMultipleImages.length}`;
  }

  get isNextDisabled() {
    return this.currentImageIndex >= this.productMultipleImages.length - 1;
  }

  get isPrevDisabled() {
    return this.currentImageIndex <= 0;
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
    this.router.navigate(['/lawyer/marketplace/allProducts'], {state: sellerDetail});
  }

}
