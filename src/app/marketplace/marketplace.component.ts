import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {
  selectedProduct: string = '';
  productsDetailList: any;

  productsName: any[] = [
    { value: 'coat', viewValue: 'Coat' },
    { value: 'collarBand', viewValue: 'Collar Band' },
    { value: 'briefCase', viewValue: 'Briefcase' },
  ];

  carouselImagess = [
    {
      image: '../../assets/images/image/marketplace-front-img.png'
    },
    {
      image: '../../assets/images/image/marketplace-front-img.png'
    }
  ];

  productsDetail = [
    {
      productId: '1',
      like: 'true',
      image: '../../assets/images/image/coat.png',
      multipleImages:['../../assets/images/image/coat.png', '../../assets/images/image/coat.png'],
      productName: 'Advocates Coat and gown',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Sandeep Agal',
      sellerMobileNo:'9876543120',
      sellerEmail:'sandeep@gmail.com',
      sellerAddress:'Indore, M.P',
      sellerMemberShipfrom:'Member since Apr 2015',
      disclaimer:'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '1110 Rs'
    },
    {
      productId: '2',
      like: 'true',
      image: '../../assets/images/image/collar_band.png',
      multipleImages:['../../assets/images/image/collar_band.png'],
      productName: 'Advocates Collar Band',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Saurabh Verma',
      sellerMobileNo:'9876543120',
      sellerEmail:'saurabh@gmail.com',
      sellerAddress:'Indore, M.P',
      sellerMemberShipfrom:'Member since Apr 2015',
      disclaimer:'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '190 Rs'
    },
    {
      productId: '3',
      like: 'false',
      image: '../../assets/images/image/breifcase.png',
      multipleImages:['../../assets/images/image/breifcase.png', '../../assets/images/image/breifcase.png'],
      productName: 'Advocates Breifcase',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Preeti jain',
      sellerMobileNo:'9876543120',
      sellerEmail:'preeti@gmail.com',
      sellerMemberShipfrom:'Member since Apr 2015',
      disclaimer:'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      sellerAddress:'Indore, M.P',
      price: '4999 Rs'
    },
    {
      productId: '4',
      like: 'true',
      image: '../../assets/images/image/table.png',
      multipleImages:['../../assets/images/image/table.png', '../../assets/images/image/table.png'],
      productName: 'Advocates table',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Sandeep Agal',
      sellerMobileNo:'9876543120',
      sellerEmail:'sandeep@gmail.com',
      sellerAddress:'Indore, M.P',
      sellerMemberShipfrom:'Member since Apr 2015',
      disclaimer:'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '1110 Rs'
    },
    {
      productId: '5',
      like: 'false',
      image: '../../assets/images/image/blazzer.png',
      multipleImages:['../../assets/images/image/blazzer.png','../../assets/images/image/blazzer.png'],
      productName: 'Advocates Blazzer',
      sellerImage: '../../assets/images/image/person.jpg',
      sellerName: 'Saurabh Verma',
      sellerMobileNo:'9876543120',
      sellerEmail:'saurabh@gmail.com',
      sellerAddress:'Indore, M.P',
      sellerMemberShipfrom:'Member since Apr 2015',
      disclaimer:'Premier legal firm offering sophisticated and professional accessories, seamlessly blending style and substance to elevate your legal presence with distinction.',
      price: '190 Rs'
    },
  ];

  constructor(private router:Router) {
    this.getProductsDataSource();
  }

  getProductsDataSource() {
    this.productsDetailList = this.productsDetail
  }

  productDetail(detail: any) {
    this.router.navigate(['/lawyer/marketplace/productDetail'], { state: detail });
  }
}
