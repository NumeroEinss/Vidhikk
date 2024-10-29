import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  files: any = { name: "No Files Selected" };
  fileUploaded: boolean = false;

  productsDetail: any = [
    {
      productId: '1',
      like: 'true',
      image: '../../assets/images/image/coat.png',
      multipleImages: ['../../assets/images/image/coat.png', '../../assets/images/image/coat1.png'],
      productName: 'Advocates Coat and gown',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Sandeep Agal',
      sellerMobileNo: '9876543120',
      sellerEmail: 'sandeep@gmail.com',
      sellerAddress: 'Indore, M.P',
      price: '1110 Rs',
      postedDate: '21 Dec 2023',
      userType:'SELLER'
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
      price: '190 Rs',
      postedDate: '21 Dec 2023',
      userType:'SELLER'
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
      sellerAddress: 'Indore, M.P',
      price: '4999 Rs',
      postedDate: '21 Dec 2023',
      userType:'SELLER'
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
      price: '1110 Rs',
      postedDate: '21 Dec 2023',
      userType:'SELLER'
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
      price: '190 Rs',
      postedDate: '21 Dec 2023',
      userType:'SELLER'
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
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'child', viewValue: 'Child' },
  ]

  constructor(private fb: FormBuilder, private router: Router) {
    this.addProductForm = new FormGroup({
      category: new FormControl(''),
      productName: new FormControl(''),
      ProductDescription: new FormControl(''),
      productPrice: new FormControl(''),
    })

    this.getSellerProductDetail();
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

  ProductDetail(detail: any) {
    this.router.navigate(['/seller/marketplace/productDetail'], { state: detail });
  }

  addProduct() {
    let productObj = {
      category: this.addProductForm.controls.category.value,
      productName: this.addProductForm.controls.productName.value,
      description: this.addProductForm.controls.ProductDescription.value,
      price: this.addProductForm.controls.productPrice.value,
      image: this.files.name,
      postedDate: new Date(),
    }

    console.log(productObj)
    this.productsDetail.push(productObj)
    this.addProductForm.reset('');
  }

  getSellerProductDetail() { }
}