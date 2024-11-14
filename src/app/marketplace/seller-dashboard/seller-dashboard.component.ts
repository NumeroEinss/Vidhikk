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
  productList: any = [];
  userData: any;
  selectAll: boolean = false;

  files: any = { name: "No Files Selected" };
  fileUploaded: boolean = false;

  // productList: any = [
  //   {
  //     productId: '1',
  //     like: 'true',
  //     image: '../../assets/images/image/coat.png',
  //     multipleImages: ['../../assets/images/image/coat.png', '../../assets/images/image/coat1.png'],
  //     productName: 'Advocates Coat and gown',
  //     sellerImage: '../../assets/images/image/person.jpg',
  //     sellerName: 'Sandeep Agal',
  //     sellerMobileNo: '9876543120',
  //     sellerEmail: 'sandeep@gmail.com',
  //     sellerAddress: 'Indore, M.P',
  //     price: '1110 Rs',
  //     postedDate: '21 Dec 2023',
  //     userType: 'SELLER'
  //   },
  //   {
  //     productId: '2',
  //     like: 'true',
  //     image: '../../assets/images/image/collar_band.png',
  //     multipleImages: ['../../assets/images/image/collar_band.png'],
  //     productName: 'Advocates Collar Band',
  //     sellerImage: '../../assets/images/image/person.jpg',
  //     sellerName: 'Saurabh Verma',
  //     sellerMobileNo: '9876543120',
  //     sellerEmail: 'saurabh@gmail.com',
  //     sellerAddress: 'Indore, M.P',
  //     price: '190 Rs',
  //     postedDate: '21 Dec 2023',
  //     userType: 'SELLER'
  //   },
  //   {
  //     productId: '3',
  //     like: 'false',
  //     image: '../../assets/images/image/breifcase.png',
  //     multipleImages: ['../../assets/images/image/breifcase.png', '../../assets/images/image/breifcase.png'],
  //     productName: 'Advocates Breifcase',
  //     sellerImage: '../../assets/images/image/person.jpg',
  //     sellerName: 'Preeti jain',
  //     sellerMobileNo: '9876543120',
  //     sellerEmail: 'preeti@gmail.com',
  //     sellerAddress: 'Indore, M.P',
  //     price: '4999 Rs',
  //     postedDate: '21 Dec 2023',
  //     userType: 'SELLER'
  //   },
  //   {
  //     productId: '4',
  //     like: 'true',
  //     image: '../../assets/images/image/table.png',
  //     multipleImages: ['../../assets/images/image/table.png', '../../assets/images/image/table.png'],
  //     productName: 'Advocates table',
  //     sellerImage: '../../assets/images/image/person.jpg',
  //     sellerName: 'Sandeep Agal',
  //     sellerMobileNo: '9876543120',
  //     sellerEmail: 'sandeep@gmail.com',
  //     sellerAddress: 'Indore, M.P',
  //     price: '1110 Rs',
  //     postedDate: '21 Dec 2023',
  //     userType: 'SELLER'
  //   },
  //   {
  //     productId: '5',
  //     like: 'false',
  //     image: '../../assets/images/image/blazzer.png',
  //     multipleImages: ['../../assets/images/image/blazzer.png', '../../assets/images/image/blazzer.png'],
  //     productName: 'Advocates Blazzer',
  //     sellerImage: '../../assets/images/image/person.jpg',
  //     sellerName: 'Saurabh Verma',
  //     sellerMobileNo: '9876543120',
  //     sellerEmail: 'saurabh@gmail.com',
  //     sellerAddress: 'Indore, M.P',
  //     price: '190 Rs',
  //     postedDate: '21 Dec 2023',
  //     userType: 'SELLER'
  //   },
  // ];

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
      ProductDescription: new FormControl(''),
      productPrice: new FormControl(''),
    })
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
    this.files = event.target.files[0];
    this.fileUploaded = true;
    console.log(this.files)
  }

  // onFileSelected(event: any): void {
  //   const fileList = event.target.files;
  //   this.files = Array.from(fileList);
  //   this.fileUploaded = true;
  //   console.log(this.files)
  // }

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

  resetForm() {
    this.addProductForm.reset('');
    this.files = "";
  }

  getSellerProductList() {
    this.apolloService.mutate(GQLConfig.getProductList).subscribe(data => {
      if (data.data != null) {
        if (data.data.getProductList.status == 200) {
          this.productList = data.data.getProductList.data.randomProducts
          this.toastMessage.success(data.data.getProductList.message);
        }
        else {
          this.toastMessage.success(data.data.getProductList.message);
        }
      }
    })
  }

  addProduct() {
    if (!this.fileUploaded) {
      this.toastMessage.error("Please add an image !!");
    }
    else if (!this.addProductForm.valid) {
      this.toastMessage.error("Please Fill all the fields !!");
    }
    else {
      const mutation = {
        "query": "mutation ($input: marketPlaceInput!, $file: Upload) { addProducts(input: $input, file: $file) { status message data } }",
        "variables": {
          "input": {
            "userType": this.userData.userType,
            "productName": this.addProductForm.controls.productName.value,
            "productDescription": this.addProductForm.controls.ProductDescription.value,
            "price": +this.addProductForm.controls.productPrice.value,
            "productCategory": this.addProductForm.controls.category.value
          },
          "file": null
        }
      }
      this.apolloService.upload(mutation, this.files, "0").subscribe(objRes => {
        if (objRes.data != null) {
          this.toastMessage.success(objRes.data.addProducts.message);
          this.addProductForm.reset('');
          let closeAddProduct = document.getElementById('closeAddProductModal') as HTMLElement;
          closeAddProduct.click();
          this.getSellerProductList();
        }
        else {
          this.toastMessage.error(objRes.data.addProducts.message);
        }
      })
    }
  }
}