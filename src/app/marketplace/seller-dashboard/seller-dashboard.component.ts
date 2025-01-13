import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { imageUrl } from '../../graphql.module';
import { AuthService } from '../../shared/services/auth.service';
import { addproductModel, editproductModel } from '../../common/marketplace.model';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent {
  routerState: any;
  isListingShow: boolean = true;
  isReviewShow: boolean = false;
  showReviewForm: boolean = false;
  reviews: string = '';
  addProductForm: FormGroup;
  editProductForm: FormGroup;
  productList: any = [];
  userData: any;
  selectAll: boolean = false;
  selectedProducts: any[] = [];
  productId: string = '';
  sellerDetail: any = [];
  reviewList: any = [];

  files: any;
  fileUploaded: boolean = false;

  previewImages: any = [];
  editFiles: any = [];
  editPreviewImages: string[] = [];

  categoryList = [
    { value: 'Clothing', viewValue: 'Clothing' },
    { value: 'Appliances', viewValue: 'Appliances' },
    { value: 'Office Supplies', viewValue: 'Office Supplies' },
  ]

  constructor(private fb: FormBuilder, private router: Router, private toastMessage: ToastMessageService,
    private apolloService: ApolloService, public _authService: AuthService) {
    this.addProductForm = this.fb.group(new addproductModel());
    this.editProductForm = this.fb.group(new editproductModel());

    this.userData = JSON.parse(sessionStorage.getItem('userData')!)
    this.getSellerDetail();
    this.getSellerProductList();
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  toggleListing() {
    this.isReviewShow = false;
    this.isListingShow = true;
  }

  toggleReview() {
    this.isReviewShow = true;
    this.isListingShow = false;
  }

  onFileSelected(event: any) {
    const fileList = event.target.files;
    this.files = Array.from(fileList);
    this.fileUploaded = true;

    this.files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // this.previewImages = [];
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = event.dataTransfer.files[0];
    this.fileUploaded = true;
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  ProductDetail(detail: any) {
    this.router.navigate(['/seller/marketplace/productDetail'], { state: detail });
  }

  getImageUrl(image: any) {
    return imageUrl() + image;
  }

  toggleSelectAll() {
    this.productList.forEach((product: any) => (product.selected = this.selectAll));
  }

  updateSelectAll() {
    this.selectAll = this.productList.every((product: any) => product.selected);
  }

  isAnyCheckboxSelected(): boolean {
    return this.productList.some((product: any) => product.selected);
  }

  resetForm() {
    this.addProductForm.reset('');
    this.files = "";
    this.fileUploaded = false;
    this.previewImages = [];
  }

  getSellerDetail() {
    let data = {
      sellerId: this.userData._id
    }
    this.apolloService.mutate(GQLConfig.getSellerRatingList, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.getSellerRatingList.status == 200) {
          this.sellerDetail = data.data.getSellerRatingList.data.response;
          this.sellerDetail.sellerRatingList.forEach((review: any) => {
            this.reviewList.push(review)
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
      sellerId: this.userData._id
    }
    this.apolloService.mutate(GQLConfig.getProductBySellerId, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.getProductBySellerId.status == 200) {
          this.productList = data.data.getProductBySellerId.data.products;
          // console.log('List', this.productList)
          this.toastMessage.success(data.data.getProductBySellerId.message);
        }
        else {
          this.toastMessage.success(data.data.getProductBySellerId.message);
        }
      }
    });
  }

  addProduct() {
    if (!this.addProductForm.valid) {
      this.toastMessage.error("Please Fill all the fields !!");
    }
    else if (!this.fileUploaded) {
      this.toastMessage.error("Please add an image !!");
    }
    else {
      const mutation = {
        "query": "mutation ($input: marketPlaceInput!, $files: [Upload!]) { addProducts(input: $input, files: $files) { status message data } }",
        "variables": {
          "input": {
            "userType": this.userData.userType,
            "sellerId": this.userData._id,
            "productName": this.addProductForm.controls.productName.value,
            "productDescription": this.addProductForm.controls.productDescription.value,
            "price": +this.addProductForm.controls.productPrice.value,
            "productCategory": this.addProductForm.controls.category.value
          },
          "files": []
        }
      }

      this.apolloService.uploadMultiple(mutation, this.files).subscribe(objRes => {
        if (objRes.data != null) {
          this.toastMessage.success(objRes.data.addProducts.message);
          let closeAddProduct = document.getElementById('closeAddProductModal') as HTMLElement;
          closeAddProduct.click();
          this.resetForm();
          this.getSellerProductList();
        }
        else {
          this.toastMessage.error(objRes.data.addProducts.message);
        }
      })
    }
  }

  triggerDeleteProduct() {
    let selectedProducts = this.productList.filter((product: any) => product.selected);
    if (selectedProducts.length > 0) {
      let el = document.getElementById('deleteProductButton') as HTMLElement;
      el.click();
    }
    else {
      this.toastMessage.error("Please select a product to delete !!");
    }
  }

  deleteProduct() {
    let reqObj = {};
    this.selectedProducts = this.productList.filter((product: any) => product.selected);
    this.selectedProducts.forEach((product: any) => {
      reqObj = {
        sellerId: product.sellerId,
        productId: product._id,
      };
      this.apolloService.mutate(GQLConfig.deleteProduct, reqObj).subscribe(data => {
        if (data.data != null) {
          if (data.data.deleteProduct.status == 200) {
            this.toastMessage.success(data.data.deleteProduct.message);
            this.getSellerProductList();
          }
          else {
            this.toastMessage.success(data.data.deleteProduct.message);
          }
        }
      })
    });
  }

  patchProductDetail(detail: any) {
    this.productId = detail._id
    this.editProductForm.controls.category.patchValue(detail.productCategory);
    this.editProductForm.controls.productName.patchValue(detail.productName);
    this.editProductForm.controls.productDescription.patchValue(detail.productDescription);
    this.editProductForm.controls.productPrice.patchValue(detail.price);
    this.editPreviewImages = [];
    detail.productImages.forEach((img: any) => {
      this.editPreviewImages.push(img);
    })
  }

  
  removeImage(index: number) {
    this.previewImages.splice(index, 1)
  }

  updateProduct() {
    if (!this.editProductForm.valid) {
      this.toastMessage.error("Please Fill all the fields !!");
    }
    else if (!this.fileUploaded) {
      this.toastMessage.error("Please add an image !!");
    }
    else {
      const mutation = {
        "query": "mutation UpdateProduct($productId: String!, $input: marketPlaceInput!, $files: [Upload!]) { updateProduct(productId: $productId, input: $input, files: $files) { status message data } }",
        "variables": {
          "productId": this.productId,
          "input": {
            "productName": this.editProductForm.controls.productName.value,
            "productDescription": this.editProductForm.controls.productDescription.value,
            "price": +this.editProductForm.controls.productPrice.value,
            "productCategory": this.editProductForm.controls.category.value
          },
          "files": []
        }
      }

      this.apolloService.uploadMultiple(mutation, this.files).subscribe(objRes => {
        if (objRes.data != null) {
          this.toastMessage.success(objRes.data.updateProduct.message);
          let closeEditProduct = document.getElementById('closeEditProductModal') as HTMLElement;
          closeEditProduct.click();
          this.resetForm();
          this.getSellerProductList();
        }
        else {
          this.toastMessage.error(objRes.data.UpdateProduct.message);
        }
      })
    }
  }
}