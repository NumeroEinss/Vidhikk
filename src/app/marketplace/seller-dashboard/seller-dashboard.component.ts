import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { imageUrl } from '../../graphql.module';

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
  imageUrls: string[] = [];
  selectedProducts: any[] = [];
  productId: string = '';

  files: any;
  fileUploaded: boolean = false;

  editProductFiles: any = [];

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

  sellersInfo = [
    {
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Sandeep Agal',
      sellerMobileNo: '9876543120',
      sellerEmail: 'sandeep@gmail.com',
      sellerAddress: 'Indore, M.P',
      sellerMemberShipfrom: 'Member since Apr 2015',
      disclaimer: 'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
    }
  ];

  categoryList = [
    { value: 'Clothing', viewValue: 'Clothing' },
    { value: 'Appliances', viewValue: 'Appliances' },
    { value: 'Office Supplies', viewValue: 'Office Supplies' },
  ]

  constructor(private fb: FormBuilder, private router: Router, private toastMessage: ToastMessageService, private apolloService: ApolloService) {
    this.addProductForm = new FormGroup({
      category: new FormControl(''),
      productName: new FormControl(''),
      productDescription: new FormControl(''),
      productPrice: new FormControl(''),
    });

    this.editProductForm = new FormGroup({
      category: new FormControl(''),
      productName: new FormControl(''),
      productDescription: new FormControl(''),
      productPrice: new FormControl(''),
    });

    this.userData = JSON.parse(sessionStorage.getItem('userData')!)
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

  onFileSelected(event: any): void {
    const fileList = event.target.files;
    this.files = Array.from(fileList);
    this.fileUploaded = true;
  }

  onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.files = event.dataTransfer.files[0];
    this.fileUploaded = true;
  }

  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  addProductsImage(event: any) {
    const fileList = Array.from(event.target.files);
    // const newFiles = fileList.map((file: any) => URL.createObjectURL(file));
    this.editProductFiles = [...this.editProductFiles, ...fileList];
    this.fileUploaded = true;
    console.log(this.editProductFiles)
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
  }

  getSellerProductList() {
    let data = {
      sellerId: this.userData._id
    }
    this.apolloService.mutate(GQLConfig.getProductBySellerId, data).subscribe(data => {
      if (data.data != null) {
        if (data.data.getProductBySellerId.status == 200) {
          this.productList = data.data.getProductBySellerId.data.products;
          console.log('List', this.productList)
          this.toastMessage.success(data.data.getProductBySellerId.message);
        }
        else {
          this.toastMessage.success(data.data.getProductBySellerId.message);
        }
      }
    })
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
    console.log(detail)
    this.productId = detail._id
    this.editProductForm.controls.category.patchValue(detail.productCategory);
    this.editProductForm.controls.productName.patchValue(detail.productName);
    this.editProductForm.controls.productDescription.patchValue(detail.productDescription);
    this.editProductForm.controls.productPrice.patchValue(detail.price);
    this.editProductFiles = []
    detail.productImages.forEach((img: any) => {
      this.editProductFiles.push(img)
    })
    console.log('images', this.editProductFiles)
  }


  removeImage(file: any, index: number) {
    this.editProductFiles.splice(index, 1)
  }

  UpdateProduct() {
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
          "input": {
            "productId": "673f3812af13408fcf953d2c",
            "productName": this.editProductForm.controls.productName.value,
            "productDescription": this.editProductForm.controls.productDescription.value,
            "price": +this.editProductForm.controls.productPrice.value,
            "productCategory": this.editProductForm.controls.category.value
          },
          "files": []
        }
      }

      console.log(this.editProductFiles)

      this.apolloService.uploadMultiple(mutation, this.editProductFiles).subscribe(objRes => {
        if (objRes.data != null) {
          this.toastMessage.success(objRes.data.UpdateProduct.message);
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