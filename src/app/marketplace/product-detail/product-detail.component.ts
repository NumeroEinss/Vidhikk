import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { imageUrl } from '../../graphql.module';

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
  productImages: any = [];
  reviews: string = '';
  currentImageIndex: number = 0;
  currentImage: string;
  userData:any;

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

    this.userData = JSON.parse(sessionStorage.getItem('userData')!)

    this.productImages.push(this.routerState.productImage)
    console.log('this.productImages', this.productImages)
    this.currentImage = this.productImages[this.currentImageIndex];
  }

  routeBack() {
    this.location.back();
  }

  getProductDetail() { }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.currentImage = this.productImages[this.currentImageIndex];
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.productImages.length - 1) {
      this.currentImageIndex++;
      this.currentImage = this.productImages[this.currentImageIndex];
    }
  }

  selectImage(index: number) {
    this.currentImageIndex = index;
    this.currentImage = this.productImages[this.currentImageIndex];
  }


  get imageNumbering() {
    console.log(this.currentImageIndex, this.productImages.length)
    return `${this.currentImageIndex + 1}/${this.productImages.length}`;
  }

  get isNextDisabled() {
    return this.currentImageIndex >= this.productImages.length - 1;
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

  getImageUrl(image: any) {
    return imageUrl() + image;
  }

  redirectToSellerProfile(sellerDetail: any) {
    this.router.navigate(['/lawyer/marketplace/allProducts'], { state: sellerDetail });
  }

}
