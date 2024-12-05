import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { imageUrl } from '../../graphql.module';
import { GQLConfig } from '../../graphql.operations';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


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
  productList: any;
  sellerDetail: any = [];
  defaultProductLength = 20;
  reviewList: any = [];
  customerService: number = 1;
  serviceQuality: number = 0;
  communication: number = 0;
  shipping: number = 0;
  ratingForm: FormGroup;
  userData: any;


  constructor(private router: Router, private location: Location, private route: ActivatedRoute,
    private toastMessage: ToastMessageService, private apolloService: ApolloService,
    private fb: FormBuilder
  ) {
    this.userData = JSON.parse(sessionStorage.getItem('userData')!)
    this.routerState = this.router.getCurrentNavigation()?.extras.state;
    if (this.routerState == undefined) {
      this.routeBack();
    }
    else {
      this.getSellerDetail();
      this.getSellerProductList()
    }

    this.ratingForm = this.fb.group({
      customerService: new FormControl(0),
      productQuality: new FormControl(0),
      communication: new FormControl(0),
      shippingHandling: new FormControl(0),
      review: new FormControl(''),
    });

  }

  ngOnInit() {
    this.updateProductNameLength();
  }

  onResize() {
    this.updateProductNameLength();
  }

  updateProductNameLength() {
    if (window.innerWidth < 600) {
      this.defaultProductLength = 30;
    } else if (window.innerWidth > 601 && window.innerWidth < 1023) {
      this.defaultProductLength = 20;
    } else if (window.innerWidth > 1023) {
      this.defaultProductLength = 20;
    }
  }

  routeBack() {
    this.location.back();
  }

  getSellerDetail() {
    let data = {
      sellerId: this.routerState.sellerId
    }
    this.apolloService.mutate(GQLConfig.getSellerRatingList, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.getSellerRatingList.status == 200) {
          this.sellerDetail = data.data.getSellerRatingList.data.response
          this.sellerDetail.sellerRatingList.forEach((review: any) => {
            this.reviewList.push(review);
          })
          this.toastMessage.success(data.data.getSellerRatingList.message);
        }
        else {
          this.toastMessage.success(data.data.getSellerRatingList.message);
        }
      }
    })
  }


  getSellerProductList() {
    let data = {
      sellerId: this.routerState.sellerId
    }
    this.apolloService.mutate(GQLConfig.getProductBySellerId, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.getProductBySellerId.status == 200) {
          this.productList = data.data.getProductBySellerId.data.products;
          this.toastMessage.success(data.data.getProductBySellerId.message);
        }
        else {
          this.toastMessage.success(data.data.getProductBySellerId.message);
        }
      }
    });
  }

  toggleListing() {
    this.isReviewShow = false;
    this.isListingShow = true;
  }

  toggleReview() {
    this.isReviewShow = true;
    this.isListingShow = false;
  }

  productDetail(detail: any) {
    this.router.navigate(['/lawyer/marketplace/productDetail'], { state: detail });
  }

  reviewForm() {
    this.showReviewForm = true;
  }

  onClick(parameter: string, e: any): void {
    console.log(parameter, e)
    this.ratingForm.get(parameter)?.setValue(e);
  }

  submitReview() {
    let data = {
      userType: this.userData.userType,
      sellerId: this.routerState.sellerId,
      userId: this.userData._id,
      customerService: parseFloat(this.ratingForm.value.customerService.rating),
      productQuality: parseFloat(this.ratingForm.value.productQuality.rating),
      communication: parseFloat(this.ratingForm.value.communication.rating),
      shippingHandling: parseFloat(this.ratingForm.value.shippingHandling.rating),
      review: this.ratingForm.controls.review.value,
    }
    console.log("review", data)

    this.apolloService.mutate(GQLConfig.createSellerRating, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.createSellerRating.status == 200) {
          this.toastMessage.success(data.data.createSellerRating.message);
        }
        else {
          this.toastMessage.error(data.data.createSellerRating.message);
        }
      }
    })
  }

  getImageUrl(image: any) {
    return imageUrl() + image;
  }
}
