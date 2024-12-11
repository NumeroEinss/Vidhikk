import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { imageUrl } from '../../graphql.module';
import { GQLConfig } from '../../graphql.operations';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { sellerRatingModel } from '../../common/marketplace.model';


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
  customerService: number = 0;
  serviceQuality: number = 0;
  communication: number = 0;
  shipping: number = 0;
  sellerRatingForm: FormGroup;
  userData: any;

  constructor(private router: Router, private location: Location, private route: ActivatedRoute,
    private toastMessage: ToastMessageService, private apolloService: ApolloService,
    private fb: FormBuilder
  ) {
    this.sellerRatingForm = this.fb.group(new sellerRatingModel)
    this.userData = JSON.parse(sessionStorage.getItem('userData')!)
    this.routerState = this.router.getCurrentNavigation()?.extras.state;
    if (this.routerState == undefined) {
      this.routeBack();
    }
    else {
      this.getSellerDetail();
      this.getSellerProductList()
    }
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
          this.reviewList = [];
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
    this.sellerRatingForm.get(parameter)?.setValue(e);
  }

  submitReview() {
    if (this.sellerRatingForm.controls.review.value == "") {
      this.toastMessage.error("Plaese add review!!");
    } else {
      let data = {
        userType: this.userData.userType,
        userId: this.userData._id,
        customerService: parseFloat(this.sellerRatingForm.value.customerService.rating),
        productQuality: parseFloat(this.sellerRatingForm.value.productQuality.rating),
        communication: parseFloat(this.sellerRatingForm.value.communication.rating),
        shippingHandling: parseFloat(this.sellerRatingForm.value.shippingHandling.rating),
        review: this.sellerRatingForm.controls.review.value,
      }
      console.log(data)
      this.apolloService.mutate(GQLConfig.createSellerRating, data).subscribe(data => {
        if (data.data != null) {
          if (data.data.createSellerRating.status == 200) {
            this.toastMessage.success(data.data.createSellerRating.message);
            this.sellerRatingForm.reset('');
            this.getSellerDetail();
          }
          else {
            this.toastMessage.error(data.data.createSellerRating.message);
          }
        }
      })
    }
  }

  getImageUrl(image: any) {
    return imageUrl() + image;
  }
} 